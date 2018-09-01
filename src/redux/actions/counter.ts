// action
export namespace TodoActions {
  export enum Type {
    INCREMENT = 'counter/INCREMENT',
    DECREMENT = 'counter/DECREMENT',
    RESET = 'counter/RESET'
  }

  export function increment() {
    console.log('increment');
    return { type: Type.INCREMENT };
  }

  export function decrement() {
    console.log('decrement');
    return { type: Type.DECREMENT };
  }

  export function reset() {
    console.log('reset');
    return { type: Type.RESET };
  }

}
