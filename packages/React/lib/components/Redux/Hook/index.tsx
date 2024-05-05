
import { useSelector as Selectors, useDispatch as Dispatcher } from "react-redux";

function useDispatch() {
    return Dispatcher();
}

function useSelector<T>(selector : (state : T) => any) {
    return Selectors(selector);
}

export { useDispatch, useSelector };
export default { useDispatch, useSelector };