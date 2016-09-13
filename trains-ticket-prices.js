/*
Average rail ticket prices for Trans-Siberian journeys
/Trains/Trans-Siberian/Average-Ticket-Prices
*/

$(document).ready(function () {

	//DOM elements
	var currencySwitch = $(".currencySwitch"),
		tables = $(".trains");

	// ticket class constants
	var tickets = [
		{
			name: "firstclass",
			value: 1
		},
		{
			name: "secondclass",
			value: 2
		},
		{
			name: "secondlower",
			value: 3
		},
		{
			name: "secondupper",
			value: 4
		}
	];


	//Prices and currencies

	// trains
	// segment data, currency of segment, then cost for segment 1, 2, 2l and 2u
	var TRAINS = [
		// 100 (016)
		{
			name: "MosVlad_100",
			prices: ["RUB", 34000, 0, 19000, 15000]
		},
		{
			name: "MosIrk_100",
			prices: ["RUB", 26900, 0, 15000, 11900]
		},
		{
			name: "IrkVlad_100",
			prices: ["RUB", 24300, 0, 13600, 10700]
		},
		{
			name: "MosYek_100",
			prices: ["RUB", 9700, 0, 5500, 4200]
		},
		{
			name: "YekIrk_100",
			prices: ["RUB", 19800, 0, 11000, 8800]
		},

		// 2
		{
			name: "MosVlad_2",
			prices: ["RUB", 46900, 0, 30900, 24500]
		},
		{
			name: "MosIrk_2",
			prices: ["RUB", 32000, 0, 22600, 17800]
		},
		{
			name: "IrkVlad_2",
			prices: ["RUB", 29000, 0, 20400, 16000]
		},
		{
			name: "MosYek_2",
			prices: ["RUB", 13000, 0, 9600, 7600]
		},
		{
			name: "YekIrk_2",
			prices: ["RUB", 24000, 0, 16700, 13000]
		},
		{
			name: "IrkUlu_2",
			prices: ["RUB", 5400, 0, 4000, 3000]
		},

	// 4
		{
			name: "MosBei_4",
			prices: ["CHF", 818, 507, 507, 507]
		},
		{
			name: "MosIrk_4",
			prices: ["CHF", 415, 242, 0, 0]
		},
		{
			name: "MosUlb_4",
			prices: ["CHF", 466, 274, 0, 0]
		},
		{
			name: "MosYek_4",
			prices: ["RUB", 12000, 6500, 0, 0]
		},
		{
			name: "IrkBei_4",
			prices: ["CHF", 439, 280, 0, 0]
		},
		{
			name: "UlbBei_4",
			prices: ["CHF", 270, 173, 173, 173]
		},

	// 6
		{
			name: "IrkBei_6",
			prices: ["CHF", 0, 0, 0, 0]
		},
		{
			name: "IrkUlb_6",
			prices: ["CHF", 164, 108, 0, 0]
		},
		{
			name: "IrkUlu_6",
			prices: ["CHF", 170, 111, 111, 111]
		},
		{
			name: "YekIrk_6",
			prices: ["CHF", 347, 218, 218, 218]
		},
		{
			name: "MosUlb_6",
			prices: ["CHF", 451, 0, 288, 288]
		},
		{
			name: "MosIrk_6",
			prices: ["CHF", 415, 242, 0, 0]
		},

	// 24
		{
			name: "UlbBei_24",
			prices: ["GBP", 171, 127, 0, 0]
		},

	// 362
		{
			name: "UluUlb_362",
			prices: ["CHF", 112, 72, 0, 0]
		},
		{
			name: "IrkUlb_362",
			prices: ["CHF", 169, 103, 0, 0]
		},

	// 20
		{
			name: "MosBei_20",
			prices: ["CHF", 883, 0, 565, 565]
		},
		{
			name: "IrkBei_20",
			prices: ["CHF", 481, 325, 325, 325]
		}
	];

	// currency rates from XXX to GBP/EUR/USD
	var currencies = [
		{
			name: "RUB",
			rate: [74.82, 65.17, 58.37]
		},
		{
			name: "CHF",
			rate: [1.20, 1.03, 0.93]
		},
		{
			name: "GBP",
			rate: [0.75, 0.82, 0.73]
		}
	];

	var commission = 1.3, //+30% commission
		def_curr = "GBP";


	//add prices in all tables
	$.each(tables, function () {
		addPrices($(this));
	});

	currencySwitch.click(function () {
		let table = $(this).parents("table"),
			option = $(this).children();

		for (let i = 0; i < option.length; i++) {
			if (option[i].selected === true && option[i].value !== def_curr) {
				def_curr = option[i].value;
			}
		}

		addPrices(table);
	});


	//fill in the table
	function addPrices(table) {
		let td = table.find("td"),
			td_sum,
			cl, //class
			curr_number;

		switch (def_curr) {
		case "GBP":
			curr_number = 0;
			break;
		case "EUR":
			curr_number = 1;
			break;
		case "USD":
			curr_number = 2;
			break;
		}

		//перебираем td
		$.each(td, function () {

			td_sum = 0;

			//все td, имеющие класс
			if ($(this).attr("class") !== undefined) {

				for (let i = 0; i < tickets.length; i++) {
					if ($(this).attr("class") === tickets[i].name) {
						cl = tickets[i].value;
						break;
					}
				}

				let tr = $(this).parents("tbody.route").children("tr");

				for (let k = 0; k < tr.length; k++) {
					let i, j;

					for (i = 0; i < TRAINS.length; i++) {
						if (tr[k].className === TRAINS[i].name) break;
					}

					for (j = 0; j < currencies.length; j++) {
						if (TRAINS[i].prices[0] === currencies[j].name) break;
					}

					td_sum += (TRAINS[i].prices[cl] / currencies[j].rate[curr_number]) * commission;
				}

				//Округление до 5 целых
				td_sum = Math.round(td_sum / 5) * 5;

				if (td_sum !== 0) {
					$(this).text(numberFormat(td_sum));
				} else {
					$(this).text("N/A");
				}
			}
		})
	} //addPrices() - END

	//Number formatting
	function numberFormat(num, cur) {
		let enPrice = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: def_curr,
			minimumFractionDigits: 2
		});

		return enPrice.format(num);
	}
});