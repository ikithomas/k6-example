import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 600,
  duration: '30s'
};

export default function() {
  const before = new Date().getTime();
  const T = 6; // time needed to complete a VU iteration

  http.get('http://edge.api.brightcove.com');

  const after = new Date().getTime();
  const diff = (after - before) / 1000;
  const remainder = T - diff;
  if (remainder > 0) {
    sleep(remainder);
  } else {
    console.warn(
      `Timer exhausted! The execution time of the test took longer than ${T} seconds`
    );
  }
}
