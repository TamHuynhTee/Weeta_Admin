import Link from 'next/link';

const MenuList = ({ caption, list }: { caption: string; list: any[] }) => {
  return (
    <ul className="">
      <li className="nav-item-caption">
        <span className="text-gray-500 pl-3">{caption}</span>
      </li>
      {list.map((item, index) => {
        return item.isLink ? (
          <li
            key={index}
            className={`nav-item ${item.activeCondition ? 'active' : ''}`}
          >
            <Link href={item.href}>
              <a className="nav-item-link">
                <div className="h-[30px] w-[30px] mr-[10px]">
                  <img src={item.icons} alt="icons" />
                </div>
                <span>{item.label}</span>
              </a>
            </Link>
          </li>
        ) : (
          <li key={index}>
            <input
              type="checkbox"
              id={`submenu_${item.href}`}
              className={`showSub`}
              hidden
              defaultChecked={item.activeCondition}
            />
            <label
              htmlFor={`submenu_${item.href}`}
              className="nav-item-link cursor-pointer"
            >
              <span className="h-[30px] w-[30px] mr-[10px]">
                <img src={item.icons} alt="icons" />
              </span>
              <span>{item.label}</span>
              <span className="w-[30px] h-[30px] ml-auto">
                <img
                  src="/icons/ic_dropdown.png"
                  className="w-full h-full object-contain transition-transform delay-100"
                  alt="dropdown"
                />
              </span>
            </label>
            {/* sub list */}
            {item.childList && item.childList.length > 0 && (
              <ul
                className={`max-h-0 bg-green-200 h-auto overflow-hidden transition-all duration-150 ease-linear`}
              >
                {item.childList.map((subItem: any, subIndex: number) => (
                  <li
                    key={`${index}_${subIndex}`}
                    className={`nav-item ${
                      subItem.activeCondition ? 'active' : ''
                    }`}
                  >
                    <Link href={subItem.href}>
                      <a className="ml-[15px] nav-item-link">
                        <div className="h-[30px] w-[30px] mr-[10px]">
                          <img src={subItem.icons} alt="icons" />
                        </div>
                        <span>{subItem.label}</span>
                      </a>
                      {/* <a className="ml-[15px] nav-item-link">
                          {subItem.label}
                        </a> */}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default MenuList;
