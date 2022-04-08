import React           from "react"
import Enzyme, {mount} from "enzyme"
import Adapter         from "enzyme-adapter-react-17"
import Board           from "./../board/board"

const setup = ()=>
{
	const props = {messages : []}

	Enzyme.configure({adapter : new Adapter()})

	const enzymeWrapper = mount(<Board {...props} />)

	return {props, enzymeWrapper}
}

describe
(
	"Board",
	()=> 
	{
		it
		(
			"should render self",
			()=>
			{
				const { enzymeWrapper } = setup()
				expect(enzymeWrapper.find("section#messages-list").length).toBe(1)
			}
		)
	}
)
