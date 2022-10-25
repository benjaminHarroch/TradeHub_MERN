

import * as React from "react";
import UserContext from '../Context/userContext';
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import {useState ,useEffect,useContext} from 'react';
import axios from "axios";
import "../css/Myaccordion.css"
import { textAlign } from "@mui/system";


    const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
        borderBottom: 0
    },
    "&:before": {
        display: "none"
    }
    }));

    const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
        {...props}
    />
    ))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(90deg)"
    },
    "& .MuiAccordionSummary-content": {
        marginLeft: theme.spacing(1)
    }
    }));

    const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)"
    }));


function MyAccordion({trades,setTrades}) {

    const [expanded, setExpanded] = React.useState("panel1");
    

    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };

    const {user,setUser}=useContext(UserContext);

   

    useEffect(()=>{


        console.log('array',trades)
      

    },[trades])
  
    return (

      <div className="containerAllaccordions">

            {trades.length>0?trades?.map((tradeobj,index)=>{
        

                       var rounded = Math.round(tradeobj.gain * 10) / 10
    
            return(


                <div>
                        <Accordion
                             expanded={expanded === `panel${index+1}`}
                             onChange={handleChange(`panel${index+1}`)}
                            >

                            <AccordionSummary aria-controls={"panel" + index+1 + "d-content"} id={"panel" + index+1 + "d-header"}>

                                <Typography>  
                                 {tradeobj.date.slice(1,11)}
                                </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <div>
                                    
                                    <h2>{tradeobj.tiker}</h2>

                                    <div className="data-trade">
                                        price avg buy : {tradeobj.buy}
                                    </div>
                                    <div className="data-trade">
                                        price avg sell : {tradeobj.sell}
                                    </div>
                                    <div className="data-trade">
                                        trend of the trade : {tradeobj.position}
                                    </div>
                                    <div className="data-trade">
                                        why take this trade? : {tradeobj.description}
                                    </div>
                                   {tradeobj.success?<div className="data-trade gain"> the trade is take : {rounded +"%"} </div>:<div className="data-trade lose">  the trade is lose : {"-"+rounded+"%"} </div>}
                                   {tradeobj.success?<div className="data-trade gain">amount of : {tradeobj.dollars +"$"} </div>:<div className="data-trade lose">  amount of: {"-" + tradeobj.dollars + "$"} </div>}
                                    
                                </div>
                                </AccordionDetails>

                     </Accordion>

                </div>

            )
            
            }):<div><h1 style={{color:"black" ,textAlign:"center"}}>please add your new trades </h1></div>}

      </div>
    );
}

export default MyAccordion;

