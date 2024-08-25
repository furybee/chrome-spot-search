export const styles = `
		.ts-overlay {
			display: none;
			position: fixed!important;
			top: 0!important;
			right: 0!important;
			bottom: 0!important;
			left: 0!important;
			background-color: rgba(0, 0, 0, 0.4)!important;
			z-index: 99999!important;
		}
		
		.ts-container {
			display: none;
			background-color: rgba(42, 48, 60, 0.95)!important;
			color: white!important;
			position: fixed!important;
			top: 30%!important;
			right: 0!important;
			left: 0!important;
			width: 100%!important;
			max-width: 600px!important;
			z-index: 99999!important;
			margin: 0 auto!important;
			overflow: hidden!important;
			max-height: 500px!important;
			box-shadow: 0 0 10px rgba(42, 48, 60, 0.7)!important;
			border-radius: 15px!important;
			font-family: Arial, sans-serif!important;
			border: 1px solid #454f5b!important;
		}
		
		.ts-container input[type=search].ts-search-input {
			width: 100%!important;
			padding: 10px 16px!important;
			font-family: Arial, sans-serif!important;
			font-size: 18px!important;
			box-sizing: border-box!important;
			outline: none!important;
			background-color: transparent!important;
			border: none!important;
			border-color: transparent!important;
			outline: none!important;
			color: #b3ccd6!important;
			caret-color: #c792e9!important;
		}
		
		.ts-container .ts-found-item-list-container {
			display: none;
			border-top: 1px solid #454f5b!important;
			overflow-x: hidden!important;
			overflow-y: auto!important;
			max-height: 240px!important;
			padding: 4px 5px 10px!important;
			scrollbar-color: #ffffff40 #0000!important;
		}
		
		.ts-container .ts-found-item-list-container .ts-found-item {
			padding: 6px 10px 6px !important;
			cursor: pointer!important;
			border-radius: 5px!important;
			display: flex!important;
			flex-direction: row!important;
			align-items: center!important;
			overflow: hidden!important;
		}
		
		.ts-container .ts-found-item-list-container .ts-found-item div {
			overflow: hidden!important;
		}
		
		.ts-container .ts-found-item-list-container .ts-found-item .ts-found-item-title {
			font-size: 12px!important;
			line-height: initial!important;
			white-space: nowrap!important;
			overflow: hidden!important;
			text-overflow: ellipsis!important;
			color: #b3ccd6!important;
			user-select: none!important;
		}
		
		.ts-container .ts-found-item-list-container .ts-found-item .ts-found-item-url {
			font-size: 11px!important;
			line-height: initial!important;
			white-space: nowrap!important;
			overflow: hidden!important;
			text-overflow: ellipsis!important;
			color: #b3ccd6!important;
			opacity: 70%;    
			padding-top: 2px!important;
			user-select: none!important;
		}
		
		.ts-container .ts-found-item-list-container .ts-found-item .ts-found-item-img {
			width: 18px!important;
			min-width: 18px!important;
			height: 18px!important;
			min-height: 18px!important;
			margin-right: 10px!important;
			display: inline-block!important;
		}
		
		.ts-container .ts-found-item-list-container .ts-found-item .ts-item-group-title {
			font-size: 11px!important;
			padding: 2px 8px!important;
			color: black!important;
			margin-right: 10px!important;
			border-radius: 5px!important;
			user-select: none!important;
		}
	`;
