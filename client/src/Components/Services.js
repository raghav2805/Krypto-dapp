import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";
import "./Css.css"

const ServiceCard = ({ color, title, icon, subtitle }) => (
    <div className="servicecard test p-3 m-2 white-glassmorphism cursor-pointer hover:shadow-xl">
        <div className="ml-5 test flex-1">
            <h3 className="mt-2 text-grey text-lg">{title}</h3>
            <p className="mt-1 text-black text-sm md:w-9/12">
                {subtitle}
            </p>
        </div>
    </div>
);

const Services = () => (
    <div className="flex w-full justify-center items-center service">
        <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
            <div className="flex-1 test">
                <div>
                    <h1 className="text-black text-3xl sm:text-5xl py-2">
                        Services that we Provide
                    </h1>
                </div>  
            </div>

            <div className="test">
                <ServiceCard
                    color="bg-[#2952E3]"
                    title="Security gurantee"
                    subtitle="Security is guranteed. We always maintain privacy and maintain the quality of our products"
                />
                <ServiceCard
                    color="bg-[#8945F8]"
                    title="Best exchange rates"
                    subtitle="Security is guranteed. We always maintain privacy and maintain the quality of our products"
                />
                <ServiceCard
                    color="bg-[#F84550]"
                    title="Fastest transactions"
                    subtitle="Security is guranteed. We always maintain privacy and maintain the quality of our products"
                />
            </div>
        </div>
    </div>
);

export default Services;