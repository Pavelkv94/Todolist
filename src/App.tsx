import './App.css';
import { AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { RequestStatusType } from './state/app-reducer';
import { ErrorSnackbar } from './components/ErrorSnackbar/ErrorSnackbar';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Login } from './features/Login/Login';
import { TodolistsList } from './TodolistsList';
import { TaskType } from './api/api';


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type PropsType = {
    demo?: boolean
}

function App({ demo = false }: PropsType) {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    return (
        <div className="App">
            <BrowserRouter>
                <ErrorSnackbar />
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu />
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>

                {status === 'loading' && <LinearProgress color="secondary" />}

                <Container fixed>
                    <Switch >
                        <Route exact path={'/'} render={() => <TodolistsList demo={demo} />} />
                        <Route path={'/login'} render={() => <Login />} />
                        <Route path={'/404'} render={() => <h1>404: PAGE NOT FOUND</h1>} />
                        <Redirect from={'*'} to={'/404'} />
                    </Switch>
                </Container>
            </BrowserRouter>
        </div>
    );
}

export default App;
