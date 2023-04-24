let operateTimeStamp = -1;

const get = (): number => {
  return operateTimeStamp;
}

const set = (time: number) => {
  operateTimeStamp = time;
}

const reset = () => {
  set(-1);
}

const getAndReset = () => {
  let timestamp = get();
  if (timestamp == -1) {
    timestamp = Date.now();
  }
  reset();
  return timestamp;
}

export const OperateTimeStamp = {
  set,
  getAndReset
}