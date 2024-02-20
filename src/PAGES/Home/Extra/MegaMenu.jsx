import { useState } from "react";
const menus = [
    { id: 1, name: "Home", link: "/" },
    {
        id: 3,
        name: "New",
        children: [{ id: 1, name: "New Arrival", link: "/new" }]
    },
    {
        id: 2,
        name: "Shop",
        children: [
            {
                id: 1,
                name: "Men's Fashion",
                children: [
                    {
                        id: 1,
                        name: "Polo",
                        link: "/polo"
                    },
                    { id: 2, name: "Tees", link: "/tees" }
                ]
            },
            {
                id: 2,
                name: "Women Fashion",
                children: [
                    {
                        id: 1,
                        name: "Shorts",
                        link: "/shorts"
                    },
                    {
                        id: 2,
                        name: "Tees",
                        link: "/women/tees"
                    }
                ]
            }
        ]
    }
];

const MegaMenu = () => {
    const [active, setActive] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [activeMenuName, setActiveMenuName] = useState("");
    const handleMainMenuClick = () => {
        setActive(!active);
    };
    const toggleDrawer = () => {
        setActiveMenuName("");
        setToggle(!toggle);
    };
    const hideSubMenu = () => {
        setActiveMenuName("");
    };
    const handleMenuName = (menuName) => {
        setActiveMenuName(menuName);
    };

    const renderLiComp = (menu) => {
        if (toggle) {
            return <li
                key={menu.id}
                className={menu.children ? "menu-item-has-children" : ""}
                onClick={() => handleMenuName(menu.name)}
            >
                {menu.link
                    ? (<a href={menu.link}>{menu.name} <i className="fa fa-angle-down"></i></a>)
                    : (<a href="#">{menu.name}</a>)}
                {activeMenuName && getSelectedChildren()}
            </li>;
        } else {
            return <li
                key={menu.id}
                className={menu.children ? "menu-item-has-children" : ""}
                onMouseEnter={() => handleMenuName(menu.name)}
            >
                {menu.link
                    ? (<a href={menu.link}>{menu.name} <i className="fa fa-angle-down"></i></a>)
                    : (<a href="#">{menu.name}</a>)}
                {activeMenuName && getSelectedChildren()}
            </li>;
        }

    }

    const renderListElements = () => {

        return menus.map(renderLiComp);
    }

    const renderChildren = (childs) => {
        const children = childs.map(x =>
            <div className="list-item text-center" key={x.id}>
                <a href="#"><img src="img/p1.jpg" alt="new Product" />
                    <h4 className="title">{x.name}</h4>
                </a>
            </div>
        );
        return children;
    }

    const getSelectedChildren = () => {
        return menus.map(x => {
            let selected;
            if (x.name === activeMenuName) {
                if (x.children) {
                    selected = <div key={x.id} className='sub-menu mega-menu mega-menu-column-4 active'>{renderChildren(x.children)}</div>;
                } else {
                    selected = <div key={x.id} className='sub-menu mega-menu mega-menu-column-4 active'></div>;
                }
            }
            return selected;
        });
    }

    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="row v-center">
                        <div className="header-item item-left">
                            <div className="logo">
                                <a href="#">Brand</a>
                            </div>
                        </div>
                        {/* menu start here */}
                        <div className="header-item item-center">
                            <div
                                className={`menu-overlay ${toggle ? "active" : ""}`}
                                onClick={toggleDrawer}
                            ></div>
                            <nav className={`menu ${toggle ? "active" : ""}`}>
                                <div className={`mobile-menu-head ${toggle ? "active" : ""}`}>
                                    <div className="go-back" onClick={hideSubMenu}>
                                        Back
                                    </div>
                                    <div className="current-menu-title">{activeMenuName}</div>
                                    <div className="mobile-menu-close" onClick={toggleDrawer}>
                                        &times;
                                    </div>
                                </div>
                                <ul className="menu-main" onClick={handleMainMenuClick}>
                                    {renderListElements()}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </>

    );
};

export default MegaMenu