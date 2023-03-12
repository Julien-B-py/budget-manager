export const isActiveRoute = (currentRoute, targetRoute) => {
    return currentRoute === targetRoute ? 'active' : '';
};