export function getActiveScreen( navState ) {
  let route = navState.routes[navState.index];
  if (route.state){
    return getActiveScreen(route.state)
  }
  return route.name;

} 
