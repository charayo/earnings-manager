
(function ($) {
    let renderHome = () => {
        $('body').html(`
            <div id="mainWrapper bg-da">
            <div id="mySidebar" class="sidebar">
                <span href="javascript:void(0)" class="closebtn" >&times;</span>
                <span id="convPage">Converter</span>
                <span id="calcPage">Calculator</span>
                <span id="homePage">Home</span>
                <span href="#">About</span>
            </div>
        
            <div class="top-bar pt-3 pb-3 row">
                <div class="col-6">
                    <span class="my-menu-icon top-left h1 fas fa-bars ml-2"></span>
                </div>
                <!-- <div class="col-sm-4"></div> -->
                <div class="col-6 text-right">
                    <span class="top-right text-white p-4 font-weight-bold">Charayo</span>
                </div>
            </div>
            <div class="m-0 p-0" id="earnFace">
                <div class="row pt-3 pb-3 pr-1 pl-1 m-0 container">
                    <div class="col-4 p-0">
                        <div class="row ml-2">
                            <h4 class="text-white ">Earnings</h4>
                            <p class="text-white" id="earnCount">0 payment</p>
                        </div>
                    </div>
                    <div class="col-8 text-right p-0">
                        <span class="text-white mr-2">Filter</span>
                        <button id="newCard" class="btn badge-pill my-new text-white mr-2" style="padding: 10px 15px;"><span
                                class="plus-rnd mr-1">&plus;</span> New</button>
                    </div>
                </div>
                <!-- List of earnings is rendered here -->
                <div class="container-fluid mx-auto" id="myCardWrap">
                    
                </div>
            
                <!-- My Add Earning modal -->
                <div class="modal" id="myModal" >
                    <div class="modal-dialogue modal-dialog-centered modal-lg">
                        <div class="modal-content card shadow-sm" style="background-color: #141625;">
                            <!-- Modal Header -->
                            <div class="modal-header text-white">
                                <h4 class="modal-title">Add Earning</h4>
                                <button type="button" class="close text-white" data-dismiss="modal">&times;</button>
                            </div>
                            <!-- Modal body -->
                            <div class="modal-body">
                                <input type="text" class="form-control mb-2" placeholder="Account username here" required id="acctNamInp" maxlength="25">
                                <input type="number" class="form-control mb-2" placeholder="Amount in USD" required id="usdInp">
                                <input type="number" class="form-control mb-2" placeholder="Enter USD to Naira Exchange Value" required id="xchRate">
                                <input type="number" class="form-control mb-2" placeholder="USD to Naira Preview Value"  id="xchRes" disabled>
                                <input type="text" name="begin" class="form-control" id="dueDate" placeholder="mm/dd/yyyy">
                                <textarea name="note" cols="30" rows="10" class="form-control mt-1" maxlength="500" id="noteInp"></textarea>
                                <input type="button" class="btn mybg text-white mt-1 d-block" value="Add" id="addBtn">
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-dismiss="modal" id="closeMod">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    
        `);
    }
    renderHome();
    let mainJS = () => {
        let today = new Date;
        let dateUpdate = () => {

            setInterval(() => {
                today = new Date;
                $('#myCardWrap').html('');
                renderIt()

            }, 3600000)
        }
        dateUpdate()

        let accountNameInp, usdInp, xchRateInp, noteInp, dateInp;
        let earnings = [];
        let idDefaultVal = 350;
        if (localStorage.getItem('currentID')) {
            idDefaultVal = parseInt(localStorage.getItem('currentID'));
        }

        $('#newCard').on('click', () => $('#myModal').modal('show'));

        //Cal does the conversion of usd to naira 
        let calc = () => {
            usdInp = $('#usdInp').val();
            xchRateInp = $('#xchRate').val();
            if (usdInp != '' && xchRateInp != '') {
                $('#xchRes').val(parseInt(usdInp) * parseInt(xchRateInp));
            }
        }
        $('#usdInp').on('keyup', () => {
            calc();
        })
        $('#xchRate').on('keyup', () => {
            calc();
        })

        //----------------


        //Shows displays the card in the dom
        let renderIt = () => {

            earnings.forEach((element) => {

                function getDate(date) {
                    return thatDay = new Date(date);
                }
                let dueDate = getDate(element.dueDate);
                let dd = String(today.getDate()).padStart(2, '0');
                let mm = String(today.getMonth() + 1).padStart(2, '0');
                let yyyy = String(today.getFullYear());
                let thisDay = mm + ' ' + dd + ' ' + yyyy;
                let currentDate = getDate(thisDay)
                // console.log(dueDate > currentDate);
                let bootsrap, payStatus;
                if (dueDate > currentDate) {
                    bootsrap = "btn-warning text-warning";
                    payStatus = "Pending";
                    icon = "fa fa-spinner";
                } else if (dueDate < currentDate) {
                    bootstrap = "btn-success text-success";
                    payStatus = "Cleared";
                    icon = "fa fa-check-circle";
                } else {
                    bootstrap = "btn-primary text-primary";
                    payStatus = "Releasing";
                    icon = "fa fa-spinner fa-spin";
                }
                let addComma = (val) => {
                    res = val.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
                }
                addComma(element.expectedEarning)
                let earning = res;
                let htmlTemp = `
                <div class="my-card  w-100 container mb-2">
                    <span class="text-danger fa fa-trash float-right pt-3 ml-2 delBtn" id = "delBtn"></span>
                    <div class="container pt-2">
                        <span class="text-white">$${element.usd}</span> <span class="text-white float-right ">${element.accountName}</span>
                        <span class="text-primary">ID: C<span>${element.Id}</span></span>
                    </div>
                    <div class="row">
                        <div class="text-left text-white container col-7">
                            <p class="">Due ${element.dueDate}</p>
                            <h3 class="mt-0">₦${earning}</h3>
                        </div>
                        <div class="col-5 text-right">
                            <button class="btn bg-transparent text-white mt-4 status-btn ${bootstrap}"><span
                                    class="${icon}"></span> ${payStatus}</button>
                                    
                        </div>
                        
                    </div>
                </div>
            `;

                $('#myCardWrap').append(htmlTemp);
            });

            $('#earnCount').html(earnings.length + '  payments');
        }
        if (localStorage.getItem('card')) {
            earnings = JSON.parse(localStorage.getItem('card'));
        }
        if (earnings.length >= 1) {
            //This updates the number of earning cards created
            $('#earnCount').html(earnings.length + '  payments');
            renderIt();
        } else {
            $('#myCardWrap').html(`
            <div class = "text-center">
                <p class = "text-white mt-5">Create your first earnings Card</>
            </div>
        `);
        }

        let getEarnDetails = () => {
            accountNameInp = $('#acctNamInp').val();
            usdInp = $('#usdInp').val();
            xchRateInp = $('#xchRate').val();
            dateInp = $('#dueDate').val();
            expectedEarning = $('#xchRes').val();
            noteInp = $('#noteInp').val();
            //validation
            if (accountNameInp !== '' && usdInp !== '' && xchRateInp !== '' && dateInp !== '') {
                idDefaultVal++;
                localStorage.setItem('currentID', idDefaultVal);
                let data = {
                    accountName: accountNameInp,
                    expectedEarning: expectedEarning,
                    dueDate: dateInp,
                    usd: `${usdInp}`,
                    Id: `${idDefaultVal}`,
                };
                earnings.push(data);
                localStorage.setItem('card', JSON.stringify(earnings));
                $('#myCardWrap').html('');
                renderIt();
                $('#myModal input').val('');
                $('#myModal').modal('hide');
            } else {
                $('#myModal').effect('shake');

            }


        }
        $('#addBtn').on('click', getEarnDetails);
        $('body').on('click', (e) => {
            if (e.target.classList.contains('delBtn')) {
                earnings.forEach((element, index) => {
                    let targ = $(e.target).next().children().eq(2).children().html();
                    if (targ == element.Id) {
                        earnings.splice(index, 1);
                        localStorage.setItem('card', JSON.stringify(earnings));
                        $(e.target).parent().remove();
                        // idDefaultVal--;
                        $('#earnCount').html(earnings.length + '  payments');
                    }
                });
            } else {
                return false;
            }
        })
        let openNav = () => {
            $('#mySidebar').css("width", "250px");
            $('#myCardWrap').css('display', "none");
        }
        let closeNav = () => {
            $('#mySidebar').css("width", "0");
            $('#myCardWrap').css('display', "block");
        }
        $('.fa-bars').on('click', () => {
            openNav();
        });
        $('.closebtn').on('click', () => {
            closeNav();
        });

        $('#homePage').on('click', () => {
            $('#mySidebar').css("width", "0");
            renderHome();
            mainJS();
            $('#myCardWrap').css('display', "d-block");
        });
        $('#calcPage').on('click', () => {
            $('#mySidebar').css("width", "0");
            $('#earnFace').html(`
            <div class = "p-0 container-fluid">
            <div class="bg-light p-5 calc-disp"></div>
                <div class="container row">
                    <div class=" btn-calc">
                        <span class="m-2 p-4 ">7</span>
                        <span class="m-2 p-4 ">7</span>
                        <span class="m-2 p-4 ">7</span>
                        <span class="m-2 p-4 ">7</span>
                        <span class="m-2 p-4 ">7</span>
                    </div>
                </div>
            
            
            
            
            </div>
            `)
        })
    }
    mainJS();
    // $('')

})(jQuery);