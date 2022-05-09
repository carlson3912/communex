import {  Link } from "react-router-dom";

import front from  '../../assets/guide/front.png';
import back from  '../../assets/guide/back.png';
import folder from '../../assets/submissionfolder.png'
import pinata from '../../assets/pinata.png';
import pinned from '../../assets/pinned.png';
import './submit.css';

export const Guidelines =() =>{
    return(
        <div id="ggbiggest">
                <h1>Submission Standards</h1>
                <div id="totalGuide">
                    <div id="gleft">
                        <h2 id="cch">Content</h2>
                        <div id="creating">
                            <p id="ccp">Use a free online clothing creator to make images for the front and back</p>
                            <div id="frandb">
                                <img id="ff1"height="150px" src={front} />
                                <img id="ff2"height="150px" src={back}/>
                            </div>
                            <p>Pick the side that should be seen first by voters; name it main.jpg</p>
                            <p>Name the other picture second.jpg</p>
                        </div>
                    </div>
                    <div id="creating2">
                        <br />
                        < br />
                        <p>Make a new folder on your computer with main.jpg, second.jpg and all the images that were put on the design:</p>
                        <img id="folder1"src={folder}/>
                    </div>
                </div>
                < br/>
                < br/>
                <div id="secondguide">
                    <div id="g2left">
                        <h2>Upload</h2>
                        <a href="https://www.pinata.cloud/">
                        <div  id="pinad">
                    
                            <img src={pinata}height='150px'/>
                            
                            <div>
                                <h2>Pinata (link)</h2>
                                <p>Navigate to pinata.com and sign up for a free account</p>
                            </div>
                        </div>
                        </a>
                    </div>
                    <div id="g2right">
                        < br/>
                        < br/>
                        <p>Upload the folder that you just created, naming it anything. Once complete, you should see something like this:</p>
                        <img src={pinned} id="pppinned"/>
                        <p>Congradulations! Your work is uploaded to IPFS, a decentralized file storage network.</p>
                    </div>
                    
                </div>
                    < br/>
                    < br/>
                    <div id="whyipfs">
                        <h2>Why use IPFS?</h2>
                        <p>The IPFS CID of every file depends on the content of the file itself, so once a CID is created, it is permanent and immutable. This means no one can change ypur design once its been submitted.</p>
                        <br />
                     </div>
                    <Link to="../Submit">
                    <div id="thirdguide">
                            <h1>Return to Submission Page</h1>
                            <p2>You'll need your IPFS CID</p2>
                    </div>
                    </Link>
                    
            <br />
        </div>
    )
}

export default Guidelines;