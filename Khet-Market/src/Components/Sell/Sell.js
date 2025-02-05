import React from 'react'
import './Sell.css'

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useStateValue } from '../../StateProvider';
import { db, storage } from '../../firebase';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';

const options = [
    'Paddy', 'Jowar', 'Bajra', 'Potato', 'Maize', 'Tomato', 'Moong', 'Urad'
];

const defaultOption = options[0];

const Sell = () => {

    const history = useHistory();

    const [{ user }, dispatch] = useStateValue();

    const [capacity, setCapacity] = React.useState(null);
    const [price, setPrice] = React.useState(null);
    const [crop, setCrop] = React.useState(null);
    const [contact, setContact] = React.useState(null);
    const [mspText, setMspText] = React.useState("")
    const [file, setFile] = React.useState(null)

    const msp = (e) => {
        setPrice(e.target.value)
    }

    const validate = (e) => {
        e.preventDefault();
        if (crop === 'Paddy' && price < 18.68) {
            setMspText(`MSP for ${crop} is ₹ 18.68`)
            alert("Price cannot be less than MSP")
            return false;
        }

        else if (crop === 'Jowar' && price < 26.20) {
            setMspText(`MSP for ${crop} is ₹ 26.20`)
            alert("Price cannot be less than MSP")
            return false;
        }

        else if (crop === 'Bajra' && price < 21.50) {
            setMspText(`MSP for ${crop} is ₹ 21.50`)
            alert("Price cannot be less than MSP")
            return false;
        }

        else if (crop === 'Potato' && price < 24) {
            setMspText(`MSP for ${crop} is ₹ 24.00`)
            alert("Price cannot be less than MSP")
            return false;
        }

        else if (crop === 'Maize' && price < 18.50) {
            setMspText(`MSP for ${crop} is ₹ 18.50`)
            alert("Price cannot be less than MSP")
            return false;
        }

        else if (crop === 'Tomato' && price < 16.5) {
            setMspText(`MSP for ${crop} is ₹ 16.5`)
            alert("Price cannot be less than MSP")
            return false;
        }

        else if (crop === 'Moong' && price < 71.96) {
            setMspText(`MSP for ${crop} is ₹ 71.96`)
            alert("Price cannot be less than MSP")
            return false;
        }

        else if (crop === 'Urad' && price < 60.3) {
            setMspText(`MSP for ${crop} is ₹ 60.3`)
            alert("Price cannot be less than MSP")
            return false;
        }

        else if (crop !== 'Paddy' && crop !== 'Jowar' && crop !== 'Bajra' && crop !== 'Potato' && crop !== 'Maize' && crop !== 'Tomato' && crop !== 'Moong' && crop !== 'Urad') {
            // document.querySelector('input').disabled = true;
            alert('Please enter the crop mentioned in the list of Available Crops')
        }

        else if (contact.length !== 10) alert('Contact No. must be of 10 digits')

        else {
            alert("Your Price is above the MSP !! Good to Go 😀	")
            document.querySelector('.sell__submit').disabled = false;

        }
    }

    const handleUpload = (event) => {
        setFile(event.target.files[0]);
    }

    const addUser = (e) => {
        e.preventDefault();
        db.settings({
            timestampsInSnapshots: true
        });
        db.collection("SellingUsers").add({
            crop: crop,
            capacity: capacity,
            price: price,
            user: user?.email,
            contact: contact,
            Image: file.name,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        const uploadTask = storage.ref(`/images/${file.name}`).put(file)

        uploadTask.on('state_change', null, (error) => {
            console.log(error);
        }, () => {
            storage.ref('posts').child(File.name).getDownloadURL().then((url) => {
                db.collection('SellingImages').add({
                    imageUrl: url,
                    email: user.email,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                })
            })
        }
        )

        history.push('/sellingItem')

        setCrop("")
        setPrice("")
        setCapacity("")
    }

    return (
        <div className='sell'>

            <h1>Sell Crops</h1>

            <h4>{`Hello ${user?.email}`}</h4>

            <form className='sell__form' onSubmit={addUser}>

                <img className='sell__formImage' src="https://cdn.pixabay.com/photo/2017/01/26/16/51/supermarket-2011060_960_720.png" alt="" />

                <div className="sell__crop">
                    <p className='sell__cropP'>Available Crops: </p>
                    <Dropdown className='sell__cropMenu' options={options} value={defaultOption} placeholder="Select an option" required />
                </div>

                <div className="sell__selectCrop">
                    <p className='sell__selectCropP'>Crop: </p>
                    <input type="text" placeholder="Enter the crop you want to sell ... " onChange={(e) => setCrop(e.target.value)} style={{ width: '33vw', height: '3vh' }} />
                </div>

                <div className="sell__capacity">
                    <p className='sell__capacityTitle'>Capacity(KG): </p>
                    <input className='sell__capacityInput' type="text" placeholder="Enter your capacity ..." onChange={(e) => setCapacity(e.target.value)} style={{ width: '33vw', height: '3vh' }} required />
                </div>

                <div className="sell__contact">
                    <p className="sell__contactP">Seller's Contact: </p>
                    <input type='text' placeholder='Enter the phone no.' value={contact} onChange={(e) => setContact(e.target.value)} style={{ width: '33vw', height: '3vh' }} />
                </div>

                <div className="sell__price">

                    <div className="sell__priceFields">
                        <p className='sell__priceP'>Price / KG: </p>
                        <input type="text" placeholder="Enter your price here ... " style={{ width: '25vw', height: '3vh' }} onChange={msp} required />
                    </div>

                    <div className="sell__mspDisplay">
                        <p style={{
                            color: "gray",
                            fontSize: "large",
                            fontWeight: "600"
                        }}>{mspText}</p>
                    </div>

                    <div className="sell__image">
                        <p className="sell__imageP">Select Image: </p>
                        <input type="file" onChange={handleUpload} />
                    </div>


                    <div className="sell__validate">
                        <input type="submit" value='Validate with MSP' onClick={validate} />
                    </div>
                </div>

                <div className="sell__button">
                    <input className='sell__submit' type='submit' value='Submit' disabled />
                </div>

                <div className="sell__redirect">
                    <input type='submit' value='Redirect to Buy page' onClick={() => history.push('/buy')} />
                </div>
            </form>

        </div>
    )
}

export default Sell
