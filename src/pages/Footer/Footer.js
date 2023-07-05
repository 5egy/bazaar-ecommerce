import React from "react";

const Footer = () => {
  return (
    <footer className="grid sm:grid-cols-2 lg:grid-cols-4 py-5">
      <List
        head="Shop"
        child={["Store Location", "Exlcusives", "programmes", "As E Dey Go"]}
      />

      <List
        head="Explore"
        child={[
          "Technology",
          "Chrome",
          "Concepts",
          "Exports",
          "Collaborations",
        ]}
      />
      <List
        head="Support"
        child={[
          "Get Help",
          "Registration",
          "Warranty",
          "Bazaar Support",
          "Customer Care",
          "Accessibility",
        ]}
      />
      <List
        head="About"
        child={["Careers", "Room", "Ventures", "Contact Us"]}
      />
    </footer>
  );
};

export default Footer;

function List({ head, child }) {
  return (
    <ul className="list-none p-2 m-2 text-center">
      <li className="text-xl md:text-2xl  text-white my-4">
        <h3>{head}</h3>
      </li>
      {child.map((item) => {
        return (
          <li className="text-[#6a2d72] cursor-pointer hover:text-[#e83cff] duration-300 my-2 text-sm" key={item}>
            <p>{item}</p>
          </li>
        );
      })}
    </ul>
  );
}
