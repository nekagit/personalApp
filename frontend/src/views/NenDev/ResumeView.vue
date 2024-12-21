<template>
  <div class="resume">
    <div class="header grid grid-cols-1 xl:grid-cols-3">
      <div class="mx-auto">
        <h1 class="text-black">Nenad Kalicanin</h1>
        <h2 class="text-gold">Software Developer</h2>
      </div>
      <img :src="Nenad" class="mx-auto profile-img" />
      <div class="contact-info mx-auto pt-5">
        <p class="text-black">
          <Icon icon="mdi:map-marker" class="contact-icon map-icon" /> Dortmund, NRW, Deutschland
        </p>
        <p class="text-black">
          <Icon icon="mdi:email" class="contact-icon email-icon" /> nenad99@hotmail.de
        </p>
        <p class="text-black">
          <Icon icon="mdi:web" class="contact-icon web-icon" /> nenadkalicanin.netlify.app
        </p>
        <p class="text-black">
          <Icon icon="mdi:phone" class="contact-icon phone-icon" /> +491781109558
        </p>
        <p class="text-black">
          <Icon icon="mdi:github" class="contact-icon github-icon" /> nekagit
        </p>
        <p class="text-black">
          <Icon icon="mdi:linkedin" class="contact-icon linkedin-icon" /> Nenad Kalicanin
        </p>
      </div>
    </div>
    <div class="content">
      <div class="left-column text-right">
        <section>
          <h3 class="text-aqua">PROFILE</h3>
          <p class="text-black">
            A software engineer with a strong commitment to developing innovative software
            solutions. With proficiency in <strong class="text-gold">TypeScript</strong> and
            <strong class="text-gold">MSSQL</strong>, I have extensive experience in creating web
            applications, APIs, and database-driven software.
          </p>
          <p class="text-black">
            My strengths include working collaboratively within team environments and utilizing
            critical thinking to solve problems and implement effective solutions.
          </p>
        </section>
        <section>
          <h3 class="text-aqua">PROJECT EXPERIENCE</h3>
          <div class="project">
            <h4 class="pt-4 text-aqua">qmBase</h4>
            <p><strong>React.ts</strong> / <strong>C#</strong></p>
            <p class="text-black">
              Fully developed enterprise application for ISO 9001 certificates.
            </p>
          </div>
          <hr class="project-divider" />
          <div class="project">
            <h4 class="text-aqua">Many more!</h4>
            <p><strong>https://nenadkalicanin.netlify.app/about</strong></p>
            <p class="text-black">
              More than 3 years of working experience in different companies!
            </p>
            <p class="text-black">
              And many more private webpages and projects done!
            </p>
          </div>
        </section>
      </div>
      <div class="right-column">
        <section>
          <h3 class="text-aqua">EDUCATION</h3>
          <p class="text-black">Technische Universität Dortmund</p>
          <p class="text-black">Bachelor of Science in Computer Science</p>
          <p class="text-black">2018-2024</p>
        </section>
        <section>
          <h3 class="text-aqua">SOFT SKILLS</h3>
          <ul class="pt-4 text-black">
            <li>Team Work</li>
            <li>Critical Thinking</li>
            <li>Communication</li>
            <li>Time Management</li>
            <li>Adaptability</li>
          </ul>
        </section>
        <section>
          <h3 class="text-aqua">HARD SKILLS</h3>
          <p class="text-black mt-4">
            <strong>Frontend:</strong> <br />
            HTML, CSS, ReactJS, VueJS, TypeScript
          </p>
          <p class="text-black">
            <strong>Backend:</strong> <br />
            C#, NodeJS, Java, Python
          </p>
          <p class="text-black">
            <strong>Database:</strong> <br />
            MySQL, MSSQL, MongoDB, Serverless
          </p>
          <p class="text-black">
            <strong>Online Collaboration Tool:</strong> <br />
            Figma, Github
          </p>
        </section>
        <section>
          <h3 class="text-aqua">LANGUAGE</h3>
          <ul class="pt-4 text-black">
            <li>English (C2)</li>
            <li>German (C2)</li>
            <li>Serbish (C2)</li>
            <li>Spanish (B2)</li>
            <li>Turkish (A1)</li>
          </ul>
        </section>
      </div>
    </div>
    <div class="footer text-center text-white mt-4">
      <p>nenad99@hotmail.de</p>
      <p>© 2024 Nenad Kalicanin.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Nenad from '@/assets/NenadOG.jpg'
import { Icon } from '@iconify/vue'
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

p {
  padding: 0.3rem;
  font-size: large;
}


.resume {
  font-family: 'Roboto', sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  color: #000000;
}

.header {
  text-align: left;
  margin-bottom: 20px;
}

.header h1 {
  font-size: 32px;
  margin-bottom: 5px;
}

.header h2 {
  font-size: 20px;
  color: #ffa500;
  margin-bottom: 10px;
}

.header p {
  margin: 2px 0;
  font-size: 16px;
  display: flex;
  align-items: center;
}

.contact-icon {
  margin-right: 8px;
  vertical-align: middle;
}

.map-icon {
  color: #ff6347;
}
.email-icon {
  color: #ffa500;
}
.web-icon {
  color: #4682b4;
}
.phone-icon {
  color: #32cd32;
}
.github-icon {
  color: #333;
}
.linkedin-icon {
  color: #0077b5;
}

.profile-img {
  max-width: 180px;
  max-height: 180px;
  height: auto;
  border-radius: 50%;
}

.content {
  display: flex;
  justify-content: space-between;
}

.left-column,
.right-column {
  flex: 1;
  padding: 20px;
}

.left-column {
  border-right: 1px solid #000000;
}

strong {
  color: #ffa500;
}

h3 {
  border-bottom: 2px solid #006e99;
  padding-bottom: 5px;
  margin-top: 20px;
  color: #0074a1;
  font-size: 24px;
}

.project h4 {
  margin-bottom: 5px;
  font-size: 18px;
  color: #006e99;
}

.project p,
.project ul {
  font-size: 16px;
  color: #000000;
}

.project a {
  color: #476be0;
  text-decoration: none;
  display: block;
  margin-bottom: 5px;
}

ul {
  padding-left: 20px;
  margin-top: 5px;
  list-style-type: disc; /* Adds bullets */
  list-style-position: inside; /* Ensures bullets appear inside the padding */
}

.footer {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: #000000;
}


@media (max-width: 730px) {
  .resume {
    padding: 0;
  }
  .content{
    display:block;
  }
  p {
    font-size: small;
  }
  li {
    font-size: small;
  }
}
</style>
