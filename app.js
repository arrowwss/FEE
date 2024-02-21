let input  = document.querySelector("#input");
let serachBtn = document.querySelector("#search");
let notFound = document.querySelector(".not_found");
let defBox = document.querySelector(".def");
let audioBox = document.querySelector('.audio');
let loading = document.querySelector(".loading")
let apiKey = "bec74245-46c6-4ff6-a1e9-839bc94e0beb"

serachBtn.addEventListener('click',function (e){
    e.preventDefault();

    //clear data

    audioBox.innerHTML ="";
    notFound.innerText ="";
    defBox.innerText = "";

    //
    let word = input.value;
    if(word === ''){
        alert("Word is require");
        return;
    }

    getWordMeaning(word)
})

async function getWordMeaning(word){

    loading.style.display = "block"
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);
    const data = await response.json();
    if(!data.length){
        loading.style.display = "none"
        notFound.innerText = "No result Found"
        return;
    }

    if (typeof data[0] === "string"){
        loading.style.display = "none"
        let heading = document.createElement("h3")
        heading.innerText = "Did you mean ?"
        notFound.appendChild(heading)
        data.forEach(ele => {
            let suggestion = document.createElement("span")
            suggestion.classList.add("suggested");
            suggestion.innerText = ele;
            notFound.appendChild(suggestion)
        })
        return
    }
    // result
    loading.style.display = "none"
    let defination = data[0].shortdef[0];
    defBox.innerText = defination;

    // audio

    let audio = data[0].hwi.prs[0].sound.audio;
    if(audio){
        renderAudio(audio)
    }
    console.log(data)
}

function renderAudio(audio){
    //  https://media.merriam-webster.com/soundc11
    let subFolder = audio.charAt(0)
    let soundsrc = ` https://media.merriam-webster.com/soundc11/${subFolder}/${audio}.wav?key=${apiKey}`

    let aud = document.createElement("audio")
    aud.src = soundsrc
    aud.controls = true;
    audioBox.appendChild(aud);
}