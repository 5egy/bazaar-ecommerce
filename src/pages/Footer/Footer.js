import React from "react";

const Footer = () => {
  return (
    <footer className="py-5 text-center">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4">
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
      </div>

      <p className="text-base text-black">
        This Site was designed and developed by{" "}
        <a className="bg-[#6a2d72] text-white p-1 px-2 hover:bg-[#e83cff] duration-500" target="_blank" href="https://github.com/l4bi">Labi</a>
      </p>
      <p className="text-base text-black">2023&copy;</p>
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
          <li
            className="text-[#6a2d72] cursor-pointer hover:text-[#e83cff] duration-300 my-2 text-sm"
            key={item}
          >
            <p>{item}</p>
          </li>
        );
      })}
    </ul>
  );
}
