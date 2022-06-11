import LineHorizontal from '../LineHorizontal';

const CardDashboardInfo = ({
  className,
  icon,
  title,
  amount,
  rate,
}: {
  className?: string;
  icon: string;
  title: string;
  amount: string;
  rate: number;
}) => {
  return (
    <div
      className={`col-span-1 border rounded-md p-[15px] bg-white ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="h-[40px] w-[40px] mr-[10px] ml-[10px]">
          <img src={icon} alt="icons" />
        </div>
        <div className="">
          <p className="text-[16px] font-thin text-right">{title}</p>
          <p className="text-[20px] font-bold text-right">{amount}</p>
        </div>
      </div>
      <LineHorizontal className="my-[10px]" />
      <div className="flex items-center justify-between">
        <p className="text-[14px]">So với tháng trước</p>
        <p
          className={`text-[14px] text-right font-bold ${
            rate > 0
              ? 'text-emerald-500'
              : rate === 0
              ? 'text-black'
              : 'text-red-500'
          }`}
        >
          {rate > 0 ? `+${rate}%` : rate === 0 ? '--' : `${rate}%`}
        </p>
      </div>
    </div>
  );
};

export default CardDashboardInfo;
