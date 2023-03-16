import React from "react";
import { useGlobalStore } from "../../context/globalContext";
import { getFormatPrice } from "../../utils";
import { useTelegram } from "../../utils/useTelegram";
import "./Chart.css";

interface ISelectDeliever {
  onChange: (value: string) => void;
  value: string;
}

const SelectDeliever: React.FC<ISelectDeliever> = ({ onChange, value }) => {
  return (
    <div className="select">
      <div
        onClick={() => onChange("Самовызов по номеру заказа")}
        className={`select-item ${
          value === "Самовызов по номеру заказа" ? "active" : ""
        }`}
      >
        Самовызов по номеру заказа
      </div>
      <div
        onClick={() => onChange("Через Яндекс.еда")}
        className={`select-item ${
          value === "Через Яндекс.еда" ? "active" : ""
        }`}
      >
        Через Яндекс.еда
      </div>
    </div>
  );
};

const Chart = () => {
  const { chart } = useGlobalStore();
  const [delieveryWay, setDelieveryWay] = React.useState(
    "Самовызов по номеру заказа"
  );
  const { tg } = useTelegram();

  React.useEffect(() => {
    tg.MainButton.setParams({
      text: `Оплатить`,
    });

    tg.MainButton.show();
  }, []);

  const onSendData = () => {};

  React.useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, []);

  return (
    <div className="chart">
      <div className="chart-title">Оформление заказа</div>
      <div className="chart-items">
        {chart.map((item) => (
          <div className="chart-item" key={item.id}>
            <div className="chart-item__name">{item.title}</div>
            <div className="chart-item__price">
              {getFormatPrice(item.price)}
            </div>
          </div>
        ))}
      </div>
      <div className="label chart-label">Время выдачи</div>
      <div className="chart-item__name" style={{ marginBottom: "15px" }}>
        Сегодня в 17:00
      </div>
      <div className="label">Способ получения</div>
      <SelectDeliever
        onChange={(value: string) => setDelieveryWay(value)}
        value={delieveryWay}
      />

      <div className="comment-section">
        <div className="label">Комментарий</div>
        <textarea />
      </div>
    </div>
  );
};

export default Chart;
