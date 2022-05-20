import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import "./Css.css";

const Footer = () => {

    const handlePageChange = () => {
        window.location.href="https://www.linkedin.com/in/raghavgoyal2805/";
    }

    return (
        <div>
            <div className="footer">
                <h1>Krypto </h1>
                <h3>Copyright©2022</h3>
                <div className='flex-footer'>
                    <FacebookIcon style={{color:'blue'}} className='icon'
                        onClick = {() => {window.location.href='https://www.facebook.com/raghav.goyal.520125/'}}
                     />
                    <InstagramIcon style={{background: 'radial-gradient(circle farthest-corner at 35% 90%, #fec564, transparent 50%), radial-gradient(circle farthest-corner at 0 140%, #fec564, transparent 50%), radial-gradient(ellipse farthest-corner at 0 -25%, #5258cf, transparent 50%), radial-gradient(ellipse farthest-corner at 20% -50%, #5258cf, transparent 50%), radial-gradient(ellipse farthest-corner at 100% 0, #893dc2, transparent 50%), radial-gradient(ellipse farthest-corner at 60% -20%, #893dc2, transparent 50%), radial-gradient(ellipse farthest-corner at 100% 100%, #d9317a, transparent), linear-gradient(#6559ca, #bc318f 30%, #e33f5f 50%, #f77638 70%, #fec66d 100%)'}} className='icon'
                        onClick = {() => {window.location.href='https://www.instagram.com/raghav5621/'}}
                    />

                    <LinkedInIcon style={{color:'#0077b5'}} className='icon' onClick={handlePageChange}/>
                </div>
            </div>
        </div>
    )
}

export default Footer;