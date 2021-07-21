import React from 'react';
import './Profile.css';
import serverUrl from '../../../utilities/urls';

class Profile extends React.Component{

    state = {
        name : this.props.user.name,
        age : this.props.user.age,
        pet : this.props.user.pet
    }
    
    

    onFormChange = (event) => {
        // switching on name as we have clearly defined name property for each input element.
        switch(event.target.name){
            case "user-name" : 
                this.setState({ name : event.target.value});
                break;
            case "user-age" : 
                this.setState({ age : event.target.value});
                break;
            case "user-pet" : 
                this.setState({ pet : event.target.value});
                break;
            default : return;
        }
    }

    onProfileUpdate = (data) => {
        fetch(`${serverUrl}/profile/${this.props.user.id}`, {
            method : 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : window.sessionStorage.getItem('token')
              },
            body : JSON.stringify({ formInput : data })
        })
        .then(res => {
            if(res.status === 200 || res.status === 304){
                this.props.toggleModal();
                this.props.loadUser({ ...this.props.user, ...data})
            }
        })
        .catch(err => console.log(err))
    }

    render(){
        const { user } = this.props;
        const { name, age, pet } =  this.state;
        return(
            <div className="profile-modal">
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
                    <main className="pa4 black-80 w-80">
                        <div className="measure">
                            <img
                                src="http://tachyons.io/img/logo.jpg"
                                className="br-100 ba h3 w3 dib" 
                                alt="avatar" 
                            />
                            <h1>{this.state.name}</h1>
                            <h4>{`Images Submitted : ${user.entries}`}</h4>
                            <p>{`Member since : ${new Date(user.joined).toLocaleDateString()}`}</p>
                            <hr />
                            
                            <label className="mt2 fw6" htmlFor="username">Name:</label>
                            <input
                                onChange={(event) => this.onFormChange(event)}
                                className="pa2 ba w-100"
                                placeholder={user.name}
                                type="text"
                                name="user-name"
                                id="user-name"
                            />
                            <label className="mt2 fw6" htmlFor="username">Age :</label>
                            <input
                                onChange={this.onFormChange}
                                className="pa2 ba w-100"
                                placeholder={user.age}
                                type="text"
                                name="user-age"
                                id="user-age"
                            />
                            <label className="mt2 fw6" htmlFor="username">Pet :</label>
                            <input
                                onChange={this.onFormChange}
                                className="pa2 ba w-100"
                                placeholder={user.pet}
                                type="text"
                                name="user-pet"
                                id="user-pet"
                            />
                            <div className="mt4" style={{ display : "flex", justifyContent: 'space-evenly'}}>
                                <button 
                                    onClick={() => this.onProfileUpdate({ name, age, pet })}
                                    className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
                                >
                                    Save
                                </button>
                                <button 
                                    onClick={this.props.toggleModal}
                                    className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20" >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </main>
                    <div className='modal-close' onClick={this.props.toggleModal}>
                        &times;
                    </div>
                </article>
            </div>
        )
    }
}

export default Profile;