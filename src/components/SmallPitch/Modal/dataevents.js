export const eventsData = [
	{
		id: 1,
		label: 'Event',
		eventSubData: [
			{ id: 1, label: 'Goals' },
			{ id: 2, label: 'Pass' },
			{ id: 3, label: 'Saves' },
			{ id: 4, label: 'Shots' },
			{ id: 5, label: 'Duels' },
			{ id: 6, label: 'Dribbles' },
		],
	},
	{ id: 2, label: 'Swap Position' },
	{ id: 3, label: 'Substitution' },
];

export const eventList = [
	{
		id: 1,
		superType: {
			title: 'GK actions',
			type: [
				{
					id: 1,
					type: 'Catches',
					events: [
						{ id: 1, type: 'Simple' },
						{ id: 2, type: 'Complex' },
					],
					outcomes: [],
				},
				{
					id: 2,
					type: 'Saves',
					events: [
						{ id: 1, type: 'OneVone' },
						{ id: 2, type: 'InsideBox' },
						{ id: 3, type: 'OutsideBox' },
					],
					outcomes: [],
				},
			],
		},
	},
	{
		id: 2,
		superType: {
			title: 'Def actions',
			type: [
				{
					id: 1,
					type: 'Tackle',
					events: [
						{ id: 1, type: 'Successful' },
						{ id: 2, type: 'Unsuccessful' },
					],
					outcomes: [],
				},
				{
					id: 2,
					type: 'Blocks',
					events: [],
					outcomes: [],
				},
				{
					id: 3,
					type: 'Duels',
					events: [
						{ id: 1, type: 'Won Aerial' },
						{ id: 2, type: 'Won Ground' },
					],
					outcomes: [],
				},
				{
					id: 6,
					type: 'Interceptions',
					events: [
						{ id: 1, type: 'Successful' },
						{ id: 2, type: 'Unsuccessful' },
					],
				},
				{
					id: 4,
					type: 'Clearance',
					events: [
						{ id: 1, type: 'Goal line' },
						{ id: 1, type: 'Under Pressure' },
					],
					outcomes: [],
				},
				{
					id: 5,
					type: 'Fouls',
					events: [
						{
							id: 1,
							type: 'Opp Half',
							outcomes: ['Successful', 'Unsuccessful'],
						},
						{
							id: 2,
							type: 'Own Half',
							outcomes: ['Successful', 'Unsuccessful'],
						},
					],
				},
			],
		},

		events: [],
	},
	{
		id: 3,
		type: 'Pass',
		events: [
			{ id: 1, type: 'Long', outcomes: ['Successful', 'Unsuccessful'] },
			{ id: 2, type: 'Line break', outcomes: ['Successful', 'Unsuccessful'] },
			{ id: 3, type: 'Short', outcomes: ['Successful', 'Unsuccessful'] },
		],
	},
	{
		id: 4,
		type: 'Set Piece',
		events: [
			{ id: 1, type: 'Free Kick', outcomes: ['On Target', 'Off Target'] },
			{ id: 2, type: 'Corner', outcomes: [] },
			{ id: 3, type: 'Penalty', outcomes: ['Missed', 'Scored'] },
		],
	},

	{
		id: 5,
		type: 'Goals',
		events: [
			{ id: 1, type: 'Header', outcomes: [] },
			{ id: 2, type: '1v1', outcomes: [] },
			{ id: 3, type: 'Outside box', outcomes: [] },
			{ id: 4, type: 'Inside box', outcomes: [] },
		],
	},
	{
		id: 6,
		type: 'Final Ball',
		events: [
			{ id: 1, type: 'Assists', outcomes: [] },
			{ id: 2, type: 'Chance Created', outcomes: [] },
		],
	},
	{
		id: 7,
		type: 'Possession',

		events: [
			{ id: 1, type: 'Dribbles', outcomes: ['Successful', 'Unsuccessful'] },
			{
				id: 2,
				type: 'Ball progression',
				outcomes: ['Successful', 'Unsuccessful'],
			},
		],
	},

	{
		id: 11,
		type: 'Shots',
		events: [
			{ id: 1, type: 'Outside box', outcomes: ['On Target', 'Off Target'] },
			{ id: 2, type: 'Inside box', outcomes: ['On Target', 'Off Target'] },
		],
	},
	{
		id: 8,
		type: 'Card',
		events: [
			{
				id: 1,
				type: 'Dissent',
				outcomes: ['Red', 'Yellow'],
			},
			{
				id: 2,
				type: 'Foul',
				outcomes: ['Red', 'Yellow'],
			},
		],
	},
	{ id: 10, type: 'Swap Position', events: [] },
	{ id: 9, type: 'Substitution', events: [] },
];

export const homePlayers = [
	{ id: 0, label: 'GK', top: '46%', left: '3%', bottom: '-130px' },
	{ id: 1, label: 'LB', left: '25%', top: '8%' },
	{ id: 2, label: 'CB', left: '25%', top: '35%', bottom: '-100px' },
	{ id: 3, label: 'CB', left: '25%', top: '60%', bottom: '-190px' },
	{ id: 4, label: 'RB', left: '25%', top: '85%', bottom: '-260px' },
	{ id: 5, label: 'MC', left: '54%', top: '10%', bottom: '-50px' },
	{ id: 6, label: 'MC', left: '54%', top: '40%', bottom: '-110px' },
	{ id: 7, label: 'MC', left: '54%', top: '70%', bottom: '-190px' },
	{ id: 8, label: 'LW', left: '75%', top: '20%' },
	{ id: 9, label: 'CF', left: '80%', top: '44%', bottom: '-130px' },
	{ id: 10, label: 'RW', left: '75%', top: '65%', bottom: '-200px' },
];
export const awayPlayers = [
	{ id: 0, label: 'GK', top: '-130', bottom: '45%', right: '8%', double: true },
	{
		id: 1,
		label: 'LB',
		top: '-210',
		right: '30%',
		bottom: '10%',
		double: true,
	},
	{
		id: 2,
		label: 'CB',
		top: '-130',
		right: '30%',
		bottom: '35%',
		double: true,
	},
	{ id: 3, label: 'CB', top: '-90', right: '30%', bottom: '59%', double: true },
	{
		id: 4,
		label: 'RB',
		top: '-10',
		right: '30%',
		bottom: '85%',
		double: true,
	},
	{ id: 5, label: 'MC', top: '-20', right: '55%', bottom: '75%' },
	{ id: 6, label: 'MC', top: '-90', right: '55%', bottom: '50%' },
	{ id: 7, label: 'MC', top: '-180', right: '55%', bottom: '22%' },
	{ id: 8, label: 'LW', top: '-170', right: '75%', bottom: '22%' },
	{ id: 9, label: 'CF', top: '-100', right: '85%', bottom: '47%' },
	{ id: 10, label: 'RW', top: '-40', right: '75%', bottom: '75%' },
];
