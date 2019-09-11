import $ from 'jquery';
import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default class PokemonPagination extends React.Component {
	onClick = (page) => {
		this.props.onChange(page);
	}

	render() {
		var activePage = this.props.activePage;
		var totalItems = this.props.totalItems;
		var itemsPerPage= this.props.itemsPerPage;

		var totalPage = Math.ceil(totalItems/itemsPerPage);
		// console.log("totalPage: " + totalPage)
		var pages = [];
		for ( var i = 1; i <= totalPage; i++ ) {
			pages.push(				
				i
			)
		}
		// console.log(pages)

		var start;
		var end;

        if ( $(window).width() > 767 ) {
			start = activePage-5;
			if ( start < 0 ) {
				start = 0;
			}
			end = start + 9;  
			pages = pages.slice(start, end)
		} else {
			start = activePage-2;
			if ( start < 0 ) {
				start = 0;
			}
			end = start + 3;  
			pages = pages.slice(start, end)
		}

		// console.log("start: " + start)
		// console.log(pages)

		return (
			<div style={{marginBottom: "20px"}}>
			<Pagination aria-label="Page navigation example">
				<PaginationItem disabled={ activePage <= 1 || totalPage <= 1 ? true : false }>
					<PaginationLink first onClick={() => this.onClick(1)} />
				</PaginationItem>
				<PaginationItem disabled={ activePage <= 1 || totalPage <= 1 ? true : false }>
					<PaginationLink previous onClick={() => this.onClick(activePage-1)} />
				</PaginationItem>
				{ 
					pages.map((page, index) => {
						return (	
							<PaginationItem key={index} active={ activePage === page ? true : false}>
								<PaginationLink onClick={() => this.onClick(page)}>
									{page}
								</PaginationLink>
							</PaginationItem>
						)
					})
				}
				<PaginationItem disabled={ activePage === totalPage || totalPage <= 1 ? true : false }>
					<PaginationLink next onClick={() => this.onClick(activePage+1)} />
				</PaginationItem>
				<PaginationItem disabled={ activePage === totalPage || totalPage <= 1 ? true : false }>
					<PaginationLink last onClick={() => this.onClick(totalPage)} />
				</PaginationItem>
			</Pagination>
			</div>
		);
	}
}