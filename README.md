# React Routie

React Routie is a tiny client-side routing library for React

[![npm](https://img.shields.io/npm/v/react-routie?style=for-the-badge&color=green)](https://www.npmjs.com/package/react-routie)

## Installation

```bash
npm install react-routie
```

## Quickstart

```jsx
import { Link, NestedRoute, Redirect, Route, Router } from 'react-routie';

const App = () => {
  return (
    <Router>
      <Route path="/" page={<h1>Home page!</h1>} />
      <Route
        path="/dashboard"
        page={
          <main>
            <h1>Dashboard page!</h1>
            <Link
              path="/dashboard/charts"
              style={({ isActive }) => ({
                color: isActive ? 'orange' : 'black',
              })}
            >
              Go to charts!
            </Link>
            <NestedRoute />
          </main>
        }
      >
        <Route
          path="/charts"
          page={
            <div>
              <h2>Nested route!</h2>
              <Link path="/dashboard">Go back to Dashboard!</Link>
            </div>
          }
        />
      </Route>
      <Route path="/*" page={<h1>Catch them all!</h1>} />
    </Router>
  );
};
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
