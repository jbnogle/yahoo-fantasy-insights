import thunk from "redux-thunk";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import { Store, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { ApplicationState, createRootReducer } from "./store";

export default function configureStore(
  initialState: ApplicationState
): Store<ApplicationState> {
  return createStore(
    createRootReducer(),
    initialState,
    composeWithDevTools(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  );
}
