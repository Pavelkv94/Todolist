import { AppBar, Button, Toolbar, Typography, withStyles } from "@material-ui/core";
import { AddItemForm } from "../AddItemForm/AddItemForm";

type NewAppBarType = {
    isLoggedIn: boolean, logoutHandler: () => void
}

const NewAppBar = withStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        minHeight: '60px',
        position: 'relative',
    },
    label: {
        textTransform: 'capitalize',
    },
})(AppBar);

export function CustomNewAppBar(props: NewAppBarType) {
    return <NewAppBar position="static" >
        <Toolbar>
            <Typography variant="h4" style={{cursor:"default"}}>
                Todolist
            </Typography>
           
            {props.isLoggedIn && <Button color="inherit" onClick={props.logoutHandler} style={{ position: "absolute", right: "10px", fontWeight: "bold", fontSize: "16px" }}>Logout</Button>}

        </Toolbar>
    </NewAppBar>
}


