<template>
    <div class="container">
        <p>Enter stock symbol to see the history.</p>

        <div class="row">
            <md-field class="symbolInput">
                <label>Stock Symbol</label>
                <md-input v-model="symbol" @keyup.enter="getStock"></md-input>
            </md-field>
            <md-button class="md-dense md-raised md-primary" id="getButton"  v-on:click="getStock">Get History</md-button>

        </div>
        
        <ErrorMessage v-if="error" :msg="error"/>
        <!-- <p v-if="loaded">Can filter out by click the options below. </p> -->
        <LineChart   v-if="loaded"
        :chartdata="chartdata"
        :options="options" />
        <div class="spinner">
            <md-progress-spinner  v-if="loading"  md-mode="indeterminate"></md-progress-spinner>
        </div>
      
    </div>
      
</template>

<script>
    import LineChart from '../components/LineChart.vue'
    import ErrorMessage from '../components/ErrorMessage.vue'
    import axios from 'axios';
    export default {
        name: 'History',
        props: {
            // msg: String
        },
        components: {
            LineChart,
            ErrorMessage
        },
        data: () => ({
            loaded: false, // for the graph
            loading:false,//for the spinner
            symbol:null,
            chartdata: null,
            options:{
                responsive: true,
                maintainAspectRatio: false
            },
            error:null
        }),
        methods:{
            getStock: function(){
               this.error=null;
               if (!this.symbol) {this.error='Please enter a symbol.'; return}
               this.loading=true; 
               this.loaded = false;
                // test example symbol: MSFT
                axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&&symbol='+this.symbol.toUpperCase()+'&apikey=6NQ84CAJ1T1RHQC4')
            .then(response => {
                this.loading=false; 
                // organizing the data to work properly with the chart 
                this.chartdata = {
                    labels: Object.keys(response.data["Time Series (Daily)"]),
                    datasets: [
                        {
                        label: 'Open',
                        backgroundColor: '#581C0B',
                        data: Object.values(response.data["Time Series (Daily)"]).map(a => a["1. open"])
                        },
                        {
                        label: 'High',
                        backgroundColor: '#8148B6',
                        data: Object.values(response.data["Time Series (Daily)"]).map(a => a["2. high"])
                        },
                        {
                        label: 'Low',
                        backgroundColor: '#F4AE8C',
                        data: Object.values(response.data["Time Series (Daily)"]).map(a => a["3. low"])
                        },
                        {
                        label: 'Close',
                        backgroundColor: '#228B22',
                        data: Object.values(response.data["Time Series (Daily)"]).map(a => a["4. close"])
                        },
                        {
                        label: 'Volume',
                        backgroundColor: '#8cd2f4',
                        data: Object.values(response.data["Time Series (Daily)"]).map(a => a["5. volume"])
                        }
                    ]
                }
                this.loaded = true;

            })
            .catch(e => {
                this.loaded =false;
                this.loading=false; 
                this.error= "Invalid Symbol";
                console.log(e)
            })
            }
        },
       
    }
    
    
</script>
  
<style scoped>
    #getButton{
        margin-top:20px;
    }
    .symbolInput{
        width:100px;
    }
    .container{
        margin:35px;
    }
    .spinner{
        margin: auto;
        width: 50px;
    }
</style>
  