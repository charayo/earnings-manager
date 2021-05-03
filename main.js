
(function ($) {
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
                bootsrap = "btn-success text-success";
                payStatus = "Cleared";
                icon = "fa fa-check-circle";
            } else {
                bootsrap = "btn-primary text-primary";
                payStatus = "Releasing";
                icon = "fa fa-spinner fa-spin";
            }
            let addComma = (val) => {
                res = val.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
            }
            addComma(element.expectedEarning)
            let earning = res;
            let htmlTemp = `
                <div class="my-card shadow-mmd w-100 container m-2">
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
                            <button class="btn bg-transparent text-white mt-4 status-btn ${bootsrap}"><span
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
    // $('')
    let openNav = ()=>{
        $('#mySidebar').css("width", "250px");
        $('#myCardWrap').css('display', "none");
    }
    let closeNav = ()=>{
        $('#mySidebar').css("width", "0");
        $('#myCardWrap').css('display', "block");
    }
    $('.fa-bars').on('click', ()=>{
        openNav();
    });
    $('.closebtn').on('click', ()=>{
        closeNav();
    });
    $('#convPage').on('click',()=>{

    })
    $('#calcPage').on('click',()=>{
        $('#mySidebar').css("width", "0");
        $('#earnFace').html(`
        <div class = "bg-dark text-white m-0 p-0 container-fluid"><h1 class="p-5">Calculator here</h1></div>
        `)
    })
})(jQuery);