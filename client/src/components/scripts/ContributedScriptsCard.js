import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import jwt from "jsonwebtoken";

export default function ContributedScriptsCard(props) {
    const grey800 = grey[800];
    const history = useHistory();
    let decode = jwt.decode(localStorage.getItem("token"));

    const individualScript = (id, btnType) => {
        if (btnType === "edit") history.push(`/edit-contributed-scripts/${id}`);
        else history.push(`/view-individual-contributed-script/${id}`);
    };

    const deletefunction = (id) => {
        Axios.delete(`/api/contribute-scripts/${id}`)
            .then((result) => {
                if (result.data.success) {
                    alert("Deleted Successfully!!");
                    history.push("/contributed-scripts-home");
                }
            })
            .catch((err) => {
                console.log(err.toString());
            });
    };

    const approvefunction = (id) => {
        Axios.post(`/api/add-contributed-script/${id}`,{'acceptor':decode.email})
            .then((result) => {
                if(result.data.success){
                    alert("Approved Successfully");
                    history.push("/allScripts");
                }
            })
            .catch((err) => {
                console.log(err.toString());
            });
    }

    return (
        <Card
            sx={{ maxWidth: 345, borderRadius: 5 }}
            style={{ backgroundColor: "black", color: "white" }}
        >
            <CardMedia sx={{ borderRadius: '50%',height:'200px',width:'200px',margin:'auto',padding:'2%'}} component="img" image={props.scriptData?props.scriptData.ImageUrl:''} alt="green iguana"/>
            <CardContent sx={{ textAlign: "center" }}>
                <Typography
                    sx={{ fontWeight: 700, fontSize: 18, pb: 2 }}
                    gutterBottom
                    component="div"
                >
                    {props.scriptData.Title}
                </Typography>
                <Typography sx={{ mx: "auto", pb: 1 }} variant="body2">
                    {props.scriptData.Contributor}
                </Typography>
                <Typography sx={{ mx: "auto" }} variant="body2">
                    {props.scriptData.Date?new Date(props.scriptData.Date).toDateString():''}
                </Typography>
            </CardContent>
            <CardActions sx={{ pb: 3 }}>
                <Button
                    sx={{ borderRadius: 2, mx: "auto", fontWeight: 600 }}
                    size="medium"
                    style={{ backgroundColor: grey800, color: "white" }}
                    onClick={() => individualScript(props.scriptData._id, "read")}
                >
                    Read
                </Button>

                {localStorage.getItem('token')?
                    <Button
                        sx={{ borderRadius: 2, mx: "auto", fontWeight: 600 }}
                        size="medium"
                        style={{ backgroundColor: grey800, color: "white" }}
                        onClick={() => deletefunction(props.scriptData._id)}
                    >
                        Delete
                    </Button>
                    :null}

                {localStorage.getItem('token')?
                    <Button
                        sx={{ borderRadius: 2, mx: "auto", fontWeight: 600 }}
                        size="medium"
                        style={{ backgroundColor: grey800, color: "white" }}
                        onClick={() => approvefunction(props.scriptData._id)}
                    >
                        Approve
                    </Button>
                    :null}
            </CardActions>
        </Card>
    );
}
