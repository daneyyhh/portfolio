import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here (or keep it as demo)
        console.log('Form submitted:', formData);
        alert('This demo form doesn\'t send yet.');
    };

    return (
        <section id="contact" className="gp-contact">
            <div className="container">
                <div className="gp-contact-grid">
                    <div className="gp-contact-left">
                        <div className="gp-mini">Get in Touch</div>
                        <h2 className="gp-h2">Let’s Talk</h2>
                        <p className="gp-lead">
                            Have a project in mind or just want to say hi? Fill out the form below.
                        </p>
                    </div>
                    <div className="gp-contact-right">
                        <form className="gp-form" onSubmit={handleSubmit}>
                            <label className="gp-field">
                                <span>Name*</span>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    autoComplete="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="gp-field">
                                <span>Mail ID*</span>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="gp-field">
                                <span>Message*</span>
                                <textarea
                                    name="message"
                                    rows="4"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                            </label>
                            <button className="gp-submit" type="submit">Send Message</button>
                            <div className="gp-form-note">This demo form doesn’t send yet.</div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
