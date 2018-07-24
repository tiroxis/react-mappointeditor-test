import * as React from "react";
import {createStyles, TextField, Theme, WithStyles, withStyles} from "@material-ui/core";
import EventEmitter from 'eventemitter3';
import IPoint from "../../../models/Point";


const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    button: {
        margin: theme.spacing.unit,
    },
});

interface IPointFormProps extends WithStyles<typeof styles> {
    point: IPoint
    events: EventEmitter
}

class PointForm extends React.Component<IPointFormProps> {

    public state = {
        point: {} as IPoint
    };

    constructor(props: any){
        super(props);

        this.add = this.add.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);

    }

    public componentDidMount(){
        this.setState({
            point : this.props.point
        });
    }

    public add() {
        this.props.events.emit('add', this.props.point);
    }

    public onChange(prop:string) {
        return (e: any) => {
            const newValue = this.state.point;
            newValue[prop] = e.target.value;
            this.setState({ point: newValue });
        };
    }

    public onKeyPress(e: any) {
        if (e.key === 'Enter' && this.props.point.title !== '') {
            this.add();
            /*this.setState((state)=> {
                console.log(state);
                return state;
            })*/
            this.props.point.title = '';
        }
    }

    public render() {

        return (
            <div>
                <TextField
                    id="title"
                    label="Title"
                    placeholder="Title"
                    margin="normal"
                    fullWidth={true}
                    value={this.props.point.title}
                    onChange={this.onChange('title')}
                    onKeyPress={this.onKeyPress}
                />

            </div>
        );
    }
}
export default withStyles(styles)(PointForm);