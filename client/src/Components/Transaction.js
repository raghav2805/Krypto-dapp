
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useState, useContext } from "react";
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import "./Css.css";


const Transaction = () => {
    const { transactions, account } = useContext(TransactionContext);

    return (
        <div className="Transaction">

        {
            !account ? <div className='metamask'>Connect to metamask</div> : 
            [ ...transactions].map((transaction, i) => (
                <div className="enlargement" key = {i}> 
                    <Card className="card" sx={{ maxWidth: 345 }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" className='flex-wrap'>
                                {transaction.keyword}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" className='flex-wrap' >
                           <span>addressFrom:</span> {shortenAddress(transaction.addressFrom)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" className='flex-wrap'>
                            <span>addressTo:</span>  {shortenAddress(transaction.addressTo)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" className='flex-wrap'>
                            <span>amount:</span> {transaction.amount}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" className='flex-wrap'>
                            <span>message:</span> {transaction.message}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            ))
            }
        
        </div>
    );
}

export default Transaction;