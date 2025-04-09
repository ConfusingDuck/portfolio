import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center gap-8"
        >
          <div className="w-full md:w-1/3">
            <div className="relative w-64 h-64 mx-auto md:mx-0">
              <img
                src="/images/headshot.png"
                alt="Profile"
                className="rounded-full object-cover w-full h-full border-4 border-primary-500"
              />
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <h2 className="heading">About Me</h2>
            <p className="text-lg mb-4">
              Hi guys! I'm a passionate software developer and hardware enthusiast with a strong background in both fields.
              I love creating innovative solutions that bridge the gap between software and hardware.
            </p>
            <span className="text-lg mb-4">
              With expertise in full-stack development and hands-on experience in electronics and robotics,
              I bring a unique perspective to every project I work on.
            </span>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-100 rounded-full text-sm">
                Full-Stack Development
              </span>
              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-100 rounded-full text-sm">
                Electronics
              </span>
              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-100 rounded-full text-sm">
                Robotics
              </span>
              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-100 rounded-full text-sm">
                FPGA
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 