import React from "react";
import './HomeComponent.css'

export default function HomeComponent () {
    return (
        <>
            {/* <!-- Hero Section --> */}
    <section className="bg-cover bg-center h-screen background" >
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
            <div className="text-center text-white px-4">
                <h2 className="text-4xl font-bold mb-4">Find the Nearest Pharmacy with the Medicine You Need</h2>
                <p className="text-xl mb-6">Quickly and easily locate pharmacies that have the medicine you're looking for.</p>
                <a href="#search" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">Search Now</a>
            </div>
        </div>
    </section>

    {/* <!-- About Section --> */}
    <section id="about" className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">About MedLocator</h2>
            <p className="text-lg">MedLocator is your go-to solution for finding the nearest pharmacies that stock the medicine you need. Our easy-to-use platform ensures that you get the right medicine at the right time without any hassle.</p>
        </div>
    </section>

    {/* <!-- Features Section --> */}
    <section id="features" className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <i className="fas fa-map-marker-alt text-4xl text-blue-600 mb-4"></i>
                    <h3 className="text-2xl font-bold mb-2">Location-Based Search</h3>
                    <p>Find pharmacies based on your current location or any specified address.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <i className="fas fa-pills text-4xl text-blue-600 mb-4"></i>
                    <h3 className="text-2xl font-bold mb-2">Medicine Availability</h3>
                    <p>Check the availability of specific medicines in nearby pharmacies.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <i className="fas fa-clock text-4xl text-blue-600 mb-4"></i>
                    <h3 className="text-2xl font-bold mb-2">24/7 Service</h3>
                    <p>Access our service anytime, anywhere.</p>
                </div>
            </div>
        </div>
    </section>

    {/* <!-- Contact Section --> */}
    <section id="contact" className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-lg mb-6">If you have any questions or need support, feel free to reach out to us.</p>
            <a href="mailto:support@medlocator.com" className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Email Us</a>
        </div>
    </section>
        </>
    );
}