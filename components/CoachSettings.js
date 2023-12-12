"use client";
import { useEffect, useState } from 'react';

function CoachSettings(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [lastname, setLastname] = useState();
    const [firstname, setFirstname] = useState();
    const [email, setEmail] = useState();
    const [photo, setPhoto] = useState();
    const [about, setAbout] = useState();
    const [experience, setExperience] = useState([])
    const [twitch, setTwitch] = useState();
    const [instagram, setInstagram] = useState()
    const [youtube, setYoutube] = useState()
    const [discord, setDiscord] = useState()
    const [price, setPrice] = useState()
    
      
    // if dans le useeffect qui dit que si il est connecté il cherche les infos else il renvoi a la page login
    
// Fetch coach information when the component mounts
    useEffect(() => {
      fetch(`http://localhost:3000/coaches/profile/${props.username}`)
        .then((response) => response.json())
        .then((data) => {
              const lastname = data.profile.lastname;
              setLastname(lastname);
              const firstname = data.profile.firstname;
              setFirstname(firstname);
              const email = data.profile.email;
              setEmail(email);
              const photo = data.profile.photo;
              setPhoto(photo);
              const about = data.profile.about;
              setAbout(about);
              const experience = data.profile.experience;
              setExperience(experience);
              const twitch = data.profile.social.twitch;
              setTwitch(twitch);
              const instagram = data.profile.social.instagram;
              setInstagram(instagram);
              const youtube = data.profile.social.youtube;
              setYoutube(youtube);
              const discord = data.profile.social.discord;
              setDiscord(discord);
              const price = data.profile.price;
              setPrice(price);
                });
            }, []);
 
 // Handle input changes and update the corresponding state variable
    const handleInputChange = (e) => {
         const { name, value } = e.target;
              
        // Define a mapping of input names to state update functions
        const fieldToStateMap = {
            lastname: setLastname,
            firstname: setFirstname,
            email: setEmail,
            photo: setPhoto,
            about: setAbout,
            experience: setExperience,
            twitch: setTwitch,
            instagram: setInstagram,
            youtube: setYoutube,
            discord: setDiscord,
            price: setPrice,
        };
              
        // Use the mapping to update the state based on the input name
            const setStateFunction = fieldToStateMap[name];
            if (setStateFunction) {
                setStateFunction(value);
            }
        };    
  
 // Function to update coach information on the server
 const updateCoachInfo = () => {
        const updatedCoachInfo = {
            lastname,
            firstname,
            email,
            photo,
            about,
            experience,
            social: {
                twitch,
                instagram,
                youtube,
                discord,
              },
            price,
        };
          
            fetch(`http://192.168.1.65:3000/coaches/profile/${props.username}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatedCoachInfo),
            })
            .then((response) => {
              if (!response.ok) {
                console.error('Failed to update coach information');
              }
            });
          };

     // Form submission and update coach information
    const handleSubmit = (e) => {
        e.preventDefault();
        updateCoachInfo();
      };
      
     // Save button, disable editing mode, and update coach information
    const handleSaveClick = () => {
        setIsEditing(false);
        updateCoachInfo();
      };

    // Enable editing mode when the edit button is clicked
    const handleEditClick = () => {
        setIsEditing(true);
    };
  
     // Cancel button, disable editing mode, and reset the form to the original state
    const handleCancelClick = () => {
      // Cancel editing and reset the form to the original state
      setIsEditing(false);
      fetch(`http://localhost:3000/coaches/profile/${props.username}`)
        .then((response) => response.json())
        .then((data) => {
            // Set the state variables back to their original values
                setLastname(data.profile.lastname);
                setFirstname(data.profile.firstname);
                setEmail(data.profile.email);
                setPhoto(data.profile.photo);
                setAbout(data.profile.about);
                setExperience(data.profile.experience);
                setTwitch(data.profile.social.twitch);
                setInstagram(data.profile.social.instagram);
                setYoutube(data.profile.social.youtube);
                setDiscord(data.profile.social.discord);
                setPrice(data.profile.price);
            });
        };
  
  
    return (
      <div>
        <h1>{props.username}'s Settings</h1>
        <form onSubmit={handleSubmit}>
          {/* Input fields for coach information */}
          <label>
            Last Name:
            <input
              type="text"
              name="lastname"
              value={lastname}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </label>
  
          <label>
            First Name:
            <input
              type="text"
              name="firstname"
              value={firstname}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </label>
  
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </label>
  
          <label>
            Photo:
            <input
              type="text"
              name="photo"
              value={photo}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </label>
  
          <label>
           About:
            <input
              type="text"
              name="about"
              value={about}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </label>

          <label>
           Experiences:
            <input
              type="text"
              name="experience"
              value={experience}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </label>
  
          <label>
            Twitch:
            <input
              type="text"
              name="twitch"
              value={twitch}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </label>
  
          <label>
            Instagram:
            <input
              type="text"
              name="instagram"
              value={instagram}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </label>
  
          <label>
            YouTube:
            <input
              type="text"
              name="youtube"
              value={youtube}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </label>
  
          <label>
            Discord:
            <input
              type="text"
              name="discord"
              value={discord}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </label>
  
          <label>
            Price:
            <textarea
              name="price"
              value={price}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </label>
  
          {!isEditing && (
            <button type="button" onClick={handleEditClick}>
              Edit
            </button>
          )}
          {isEditing && (
            <>
              <button type="button" onClick={handleSaveClick}>
                Save
              </button>
              <button type="button" onClick={handleCancelClick}>
                Cancel
              </button>
            </>
          )}
        </form>
      </div>
    );
  }

export default CoachSettings;
