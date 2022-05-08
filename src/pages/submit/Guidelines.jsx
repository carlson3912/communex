import front from  '../../assets/guide/front.png';
import back from  '../../assets/guide/back.png';
import './submit.css';

export const Guidelines =() =>{
    return(
        <div id="totalGuide">
            <div id="creating">
                <h2>Submission Content</h2>
                <p>Use a free online clothing creator to make images of the front and the back of your design.</p>
                <img height="150px" src={front} />
                <img height="150px" src={back}/>
            </div>
        </div>
    )
}

export default Guidelines;