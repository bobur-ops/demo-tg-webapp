import React from "react";
import { Link } from "react-router-dom";
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
  const [chart, setChart] = React.useState<IProduct[]>(
    JSON.parse(localStorage.chart)
  );
  const [delieveryWay, setDelieveryWay] = React.useState(
    "Самовызов по номеру заказа"
  );
  const [comment, setComment] = React.useState("");

  const { tg, queryId, onClose } = useTelegram();

  React.useEffect(() => {
    tg.MainButton.setParams({
      text: `Оплатить`,
    });

    tg.MainButton.show();
  }, []);

  const onSendData = React.useCallback(async () => {
    const data = {
      queryId,
      products: chart,
      delievery: delieveryWay,
      delievery_time: "17:00",
    };

    fetch("http://v1328936.hosted-by-vdsina.ru:8000/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    localStorage.chart = JSON.stringify([]);
    onClose();
  }, [queryId, chart, delieveryWay]);

  React.useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData]);

  const deleteChartItem = (id: number) => {
    const newChart = chart.filter((item) => item.id !== id);
    setChart(newChart);

    localStorage.chart = JSON.stringify(newChart);
  };

  return (
    <div className="chart">
      <div className="chart-title">Оформление заказа</div>
      <div className="chart-items">
        {chart?.map((item) => (
          <div className="chart-item" key={item.id}>
            <div className="chart-item__name">
              {`${item.title} • `} <span>{getFormatPrice(item.price)}</span>
            </div>
            <div className="chart-item__price">
              <button onClick={() => deleteChartItem(item.id)}>Удалить</button>
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
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <button style={{ marginTop: "20px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Вернуться на главный экран
        </Link>
      </button>
    </div>
  );
};

export default Chart;
