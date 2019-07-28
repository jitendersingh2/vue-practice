interface IRouteChild {
  routeName: string;
}

export default interface ITabItem {
  routeName: string;
  name: string;
  children?: IRouteChild[];
}
