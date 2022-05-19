import shirtThree from '../../assets/shirtFour.jpeg'
import matlab from '../../assets/matlab2.jpeg'
import camel from '../../assets/camelShirt.jpeg'
import moneyFace from '../../assets/monetFace.JPG'
import longLine from '../../assets/longLine.JPG'
import mateoTwo from '../../assets/mateoTwo.jpeg'
import visten from '../../assets/manu1.jpg'
import joker from '../../assets/jokerdiscord.jpeg'
import slaughter from '../../assets/slaughtergang.jpeg'
import poole from '../../assets/pooleparty.jpeg'
import poole2 from '../../assets/pooleparty2.jpeg'

// import sandbox from '../../assets/srssandbox.jpeg'
// async function conn(){
// const[cat, setCat] = useState(null);
// const Http = new XMLHttpRequest();
// const url='https://api.thecatapi.com/v1/images/search';
// Http.open("GET", url);
// Http.send();

// Http.onreadystatechange = (e) => {
//     setCat(JSON.parse(Http.responseText));
//     console.log(cat[0].url);
// }
// return cat[0].url;
// }
export const listShirts = new Array(
    shirtThree,
    matlab,
    camel,
    slaughter,
    moneyFace,
    longLine,
    mateoTwo,
    visten,
    joker,
    slaughter,
    poole,
    poole2,
  
    // "https://cdn2.thecatapi.com/images/bif.jpg"
);

export const listNames= new Array(
    "Blue Token",
    "Navy Skeleton",
    "Glitched Camel",
    "Composed of Early SRS Assets",
    "Money Face Wrap",
    "Alaskan",
    "Money Face Mateo",
    "Visten Launch",
    "Joker OG",
    "Composed of Early SRS Assets",
    "Poole from Warriors Series 2022 PlayOffs",
    "man city"
);

export const makeList = () => {
    var answer = [];
    // answer.push({
    //     src: conn(),
    //     name: "cat",
    //     posi: 0
    // }
        
    // )
    for(let i = 0; i<listShirts.length;i++){
        // var stringIN = "design "+i;
        answer.push({
            src: listShirts[i],
            name: listNames[i],
            posi: i
        });

    }
    return answer
}
