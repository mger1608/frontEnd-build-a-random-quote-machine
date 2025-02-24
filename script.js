const colors = [
  "#7A4F9B",
  "#E63946",
  "#F4A261",
  "#2A9D8F",
  "#8ECAE6",
  "#FFB703",
  "#606C38",
  "#D90429",
  "#219EBC",
  "#F48C06",
  "#7209B7",
  "#52B788"
];



async function fetchQuotes() {
  const url = 'https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/';
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
        
    const data = await response.json();
    return data.quotes.map(q => ({ quote: q.quote,
                                  author: q.author
                                 }));
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return [];
  }
}

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "",
      author: "",
      backgroundColor: "#ffffe6"
    }
    this.handleNewQuote = this.handleNewQuote.bind(this);
  } 
   
  async handleNewQuote(event) {
    const quotes = await fetchQuotes();
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    this.setState({
      quote: randomQuote.quote,
      author: randomQuote.author,
      backgroundColor: colors[Math.floor(Math.random() * colors.length)]
    });
  }
 
  loadInitialQuote = async () => {
    const quotes = await fetchQuotes();
    if (quotes.length > 0) {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      this.setState({
        quote: randomQuote.quote,
        author: randomQuote.quthor,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)]
      });
    } else {
      console.log("No quotes fetched, keeping default");
      this.setState({quote: "Error fetching quote", 
                     author: "Unknown",
                     backgroundColor: "#ffffe6"})
    }
  };
  
  componentDidMount() {
    this.loadInitialQuote();
  }
  
  render() {
    return (
      <div id="quote-box" style = {{ backgroundColor: this.state.backgroundColor}}>

        <div className="quote-text">
          <i className="fa fa-quote-left"></i>
          <span id="text">{this.state.quote}</span>
          <i className="fa fa-quote-right"></i>
        </div>

        <div className="quote-author">
        - <span id="author">{this.state.author}</span>
        </div>

        <div className="buttons">
          <a
            className="button"
            id="tweet-quote"
            title="Tweet this quote!"
            target="_top"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(this.state.quote + " - " + this.state.author)}`}
            >
            <i className="fab fa-twitter"></i>
          </a>
          <button className="button" id="new-quote" onClick = {this.handleNewQuote}>New quote
          </button>
        </div>
        <br></br>
        <div className="footer">by<a href="https://github.com/mger1608/">mger1608</a>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<QuoteBox />, document.getElementById('root'));
