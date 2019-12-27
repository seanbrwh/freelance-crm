import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface DropdownProps {
  children?: any;
  label: string;
  items: string[];
}

const Dropdown: React.SFC<DropdownProps> = ({ label, items }) => {
  var [showDropdown, setShowDropdown] = React.useState(false);
  const Dropdown = styled.div`
    font-family: "Open Sans", sans-serif;
    position: relative;
    display: inline-block;
    text-transform: uppercase;
  `;
  const Button = styled.div`
    margin: 1rem;
    cursor: pointer;
    padding: 1rem;
    &:hover {
      cursor: pointer;
    }
  `;
  const Ul = styled.ul`
    list-style-type: none;
    top: 4rem;
    left: 1rem;
    width: 17rem;
    background-color: white;
    font-weight: bold;
    position: absolute;
    border-radius: 0.3rem;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  `;
  const Li = styled.li`
    font-weight: 100;
    padding: 0.5rem 1rem 0.5rem 1rem;
    color: #aaadac;
    font-size: 0.9rem;
    &:hover {
      color: #3e403f;
      cursor: pointer;
    }
  `;

  return (
    <Dropdown>
      <Button
        type="button"
        value={label}
        onClick={() => setShowDropdown(!showDropdown)}
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        {label}
      </Button>
      {showDropdown && (
        <Ul
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          {items.map((el, idx) => (
            <Li key={idx}>
              <Link to={`/${el.replace(/\s/g, "-").toLocaleLowerCase()}`}>
                {el}
              </Link>
            </Li>
          ))}
        </Ul>
      )}
    </Dropdown>
  );
};

export default Dropdown;
