// Contains a profile picture, an image file chooser, and editable labels for basic character info

import { useState, useEffect, useRef } from "react"

export default function Profile() {
    const imgRef = useRef()

    function loadCharImg(e) {
        if (e.target.files && e.target.files[0]) {
            // Create a FileReader to read the uploaded file and render the image in the #char-image element
            let reader = new FileReader()
            reader.onload = (event) => {
                imgRef.current.setAttribute('src', event.target.result)
                // Save image file to local storage
                localStorage.setItem('profile-pic', event.target.result)
            }

            reader.readAsDataURL(e.target.files[0])
        }
    }

    function getDefaultImage() {
        const localPic = localStorage.getItem('profile-pic')

        return (localPic === null) ? "../images/AnonPic.png" : localPic
    }

    return (
        <aside id="char-profile">
            <img src={getDefaultImage()} alt="Character image" id="char-image" ref={imgRef} />

            <section id="basic-info">
                <label htmlFor="img-upload">
                    Upload character image:
                    <input type="file" id="img-upload" name="img-upload" onChange={e => loadCharImg(e)} accept="image/*" />
                </label>
                <br />
                <InfoLabel property={"Name"} />
                <InfoLabel property={"Age"} />
                <InfoLabel property={"Race"} />
                <InfoLabel property={"Sex"} />
            </section>
        </aside>
    )
}

function InfoLabel({ property }) {
    const [answer, setAnswer] = useState(() => {
        const savedAnswer = localStorage.getItem(property)
        return (savedAnswer === 'null') ? "Edit" : savedAnswer
    })

    useEffect(() => {
        localStorage.setItem(property, answer)
    }, [answer])

    return (
        <label className="info-label">
            {property}:
            <input type="text" name="info-field" id="info-field" defaultValue={answer} onBlur={e => setAnswer(e.target.value)} />
        </label>
    )
}