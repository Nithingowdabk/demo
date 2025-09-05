const treks = [
  {
    name: "Wayanad Trip",
    price: 4999,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    description: "2 Days 1 Night. With transportation, Without transportation, Booking Amount. GST 5%. Status: Filling Fast.",
    options: [
      { label: "With transportation", price: 4999 },
      { label: "Without transportation", price: 2999 },
      { label: "Booking Amount", price: 2500 }
    ],
    status: "Filling Fast"
  },
  {
    name: "Netravathi Trek",
    price: 4199,
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    description: "2 Days 1 Night. With transportation, Without transportation, Booking Amount. GST 5%. Status: Open.",
    options: [
      { label: "With transportation", price: 4199 },
      { label: "Without transportation", price: 2999 },
      { label: "Booking Amount", price: 2500 }
    ],
    status: "Open"
  },
  {
    name: "Kodachadri Trek with Hidlumane Falls",
    price: 3999,
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
    description: "2 Days 1 Night. With transportation, Without transportation, Booking Amount. GST 5%. Status: Filling Fast.",
    options: [
      { label: "With transportation", price: 3999 },
      { label: "Without transportation", price: 2999 },
      { label: "Booking Amount", price: 2500 }
    ],
    status: "Filling Fast"
  },
];

function renderTreks() {
  const trekList = document.getElementById('trekList');
  trekList.innerHTML = '';
  treks.forEach((trek, idx) => {
    const card = document.createElement('div');
    card.className = 'trek-card';
    card.innerHTML = `
      <img src="${trek.image}" class="trek-img" alt="${trek.name}">
      <div class="trek-info">${trek.name} [Rs.${trek.price}]</div>
      <div class="trek-actions">
  <button class="btn" onclick="showPDF(${idx})">PDF</button>
        <button class="btn" onclick="showDetails(${idx})">Book</button>
      </div>
    `;
    trekList.appendChild(card);
  });
}

function showPDF(idx) {
  const pdfModal = document.createElement('div');
  pdfModal.className = 'modal';
  pdfModal.innerHTML = `
    <div class="modal-content">
      <span class="close" id="closePdfModal">&times;</span>
      <h2>Download PDF for ${treks[idx].name}</h2>
      <form id="pdfForm">
        <label>Name:</label><br>
        <input type="text" id="pdfName" required style="width:100%;margin-bottom:10px;"><br>
        <label>Phone Number:</label><br>
        <input type="tel" id="pdfPhone" required pattern="[0-9]{10}" style="width:100%;margin-bottom:20px;"><br>
        <button type="submit" class="btn" style="width:100%;">Download PDF</button>
      </form>
    </div>
  `;
  document.body.appendChild(pdfModal);
  document.getElementById('closePdfModal').onclick = function() {
    pdfModal.remove();
  };
  pdfModal.onclick = function(event) {
    if (event.target === pdfModal) pdfModal.remove();
  };
  document.getElementById('pdfForm').onsubmit = function(e) {
    e.preventDefault();
    const name = document.getElementById('pdfName').value.trim();
    const phone = document.getElementById('pdfPhone').value.trim();
    if (!name || !phone.match(/^\d{10}$/)) {
      alert('Please enter a valid name and 10-digit phone number.');
      return;
    }
    // Simulate PDF download
    const link = document.createElement('a');
    link.href = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'; // Replace with actual PDF URL
    link.download = `${treks[idx].name.replace(/\s+/g,'_')}_info.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    pdfModal.remove();
    alert('PDF downloaded for ' + treks[idx].name + ' (demo only)');
  };
}

function showDetails(idx) {
  // ...existing code...
  function showTicketStep(selectedDate) {
    body.innerHTML = `
      <div style=\"text-align:center;margin-bottom:10px;\">
        <div style=\"font-size:1.3rem;font-weight:700;\">Create Tickets & Pay</div>
        <div style=\"font-size:1.1rem;margin-bottom:10px;\">${trek.name} [Rs.${trek.price}]</div>
      </div>
      <div style=\"text-align:center;color:#22a63a;font-weight:600;margin-bottom:15px;\">Selected Date<br><span style=\"font-size:1.1rem;\">${selectedDate ? selectedDate : 'No date selected'}</span></div>
      <div style=\"font-weight:600;margin-bottom:10px;\">Select Ticket(s)</div>
      <div id=\"ticketOptions\"></div>
      <div style=\"margin:15px 0;\">
        <label style=\"font-size:0.95rem;\"><input type=\"checkbox\" id=\"termsCheck\"> I have read and accept the Refunds, Cancellation Policy & Terms & Conditions</label>
      </div>
      <div style=\"display:flex;align-items:center;justify-content:space-between;margin-bottom:15px;\">
        <div style=\"font-size:1.3rem;font-weight:700;\" id=\"totalPrice\">₹0.00</div>
        <button id=\"payNowBtn\" style=\"background:#aee6b1;color:#fff;font-weight:600;font-size:1.1rem;padding:10px 30px;border:none;border-radius:7px;letter-spacing:2px;\" disabled>Pay Now</button>
      </div>
      <div style=\"text-align:center;margin-top:10px;font-size:0.95rem;color:#22a63a;\">
        <span style=\"display:inline-flex;align-items:center;gap:5px;\"><svg width=\"18\" height=\"18\" fill=\"#22a63a\" viewBox=\"0 0 24 24\"><path d=\"M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1-6l-4-4 1.414-1.414L11 13.172l5.293-5.293 1.414 1.414-6.707 6.707z\"></path></svg>secured by : logout.studio</span>
      </div>
    `;
    // Render ticket options
    const ticketDiv = document.getElementById('ticketOptions');
    let total = 0;
    const ticketState = {};
    trek.options.forEach((opt, i) => {
      ticketState[i] = 0;
      const row = document.createElement('div');
      row.style = 'display:flex;align-items:center;justify-content:space-between;background:#f7f7f7;border-radius:15px;padding:15px 20px;margin-bottom:15px;font-size:1.1rem;';
      row.innerHTML = `
        <span>${opt.label} : ₹${opt.price.toFixed(2)}</span>
        <div style=\"display:flex;align-items:center;gap:10px;\">
          <button class=\"btn\" style=\"background:#eee;color:#222;padding:2px 10px;\" id=\"minus${i}\">-</button>
          <span id=\"qty${i}\">0</span>
          <button class=\"btn\" style=\"background:#eee;color:#222;padding:2px 10px;\" id=\"plus${i}\">+</button>
        </div>
      `;
      ticketDiv.appendChild(row);
      setTimeout(() => {
        document.getElementById(`minus${i}`).onclick = function() {
          if (ticketState[i] > 0) ticketState[i]--;
          document.getElementById(`qty${i}`).textContent = ticketState[i];
          updateTotal();
        };
        document.getElementById(`plus${i}`).onclick = function() {
          ticketState[i]++;
          document.getElementById(`qty${i}`).textContent = ticketState[i];
          updateTotal();
        };
      }, 100);
    });
    function updateTotal() {
      total = 0;
      trek.options.forEach((opt, i) => {
        total += ticketState[i] * opt.price;
      });
      document.getElementById('totalPrice').textContent = `₹${total.toFixed(2)}`;
    }
    // Enable Pay Now only if terms checked and total > 0
    setTimeout(() => {
      document.getElementById('termsCheck').onchange = function() {
        document.getElementById('payNowBtn').disabled = !(this.checked && total > 0);
      };
      document.getElementById('payNowBtn').onclick = function() {
        alert('Payment flow not implemented (demo only).');
      };
    }, 200);
  }
  const trek = treks[idx];
  const modal = document.getElementById('detailsModal');
  const body = document.getElementById('modalBody');
  body.innerHTML = `
    <div style="display:flex;align-items:center;gap:15px;margin-bottom:15px;">
      <img src="${trek.image}" style="width:60px;height:60px;border-radius:10px;object-fit:cover;">
      <div>
        <div style="font-size:1.1rem;font-weight:600;">${trek.name} [Rs.${trek.price}]</div>
        <span style="background:#5fd34a;color:#fff;padding:2px 10px;border-radius:8px;font-size:0.9rem;">Available</span>
      </div>
    </div>
    <p><strong>Status:</strong> ${trek.status}</p>
    <p>${trek.description}</p>
    <ul>
      ${trek.options.map(opt => `<li>${opt.label}: <strong>₹${opt.price}/-</strong></li>`).join('')}
    </ul>
    <p><strong>GST (Exclusive of Price):</strong> 5%</p>
    <button id="bookDatesBtn" class="btn" style="width:100%;margin-top:10px;">Book Dates</button>
    <button class="btn" style="width:100%;margin-top:10px;background:#222;" onclick="alert('Enquiry sent (demo only)')">Send Enquiry</button>
    <div style="display:flex;justify-content:center;gap:60px;margin-top:40px;">
      <div style="display:flex;flex-direction:column;align-items:center;">
        <div style="background:#5fd34a;border-radius:15px;width:50px;height:50px;display:flex;align-items:center;justify-content:center;margin-bottom:8px;">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="12" fill="#5fd34a"/><path d="M7 17V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v10" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="14" r="1" fill="#fff"/></svg>
        </div>
        <div style="background:#fff;border-radius:10px;padding:10px 20px;box-shadow:0 2px 8px #eee;text-align:center;">
          <div style="font-size:0.9rem;font-weight:600;letter-spacing:2px;">HELPDESK</div>
          <div style="font-size:1rem;margin-top:2px;">123</div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;">
        <div style="background:#25d366;border-radius:50%;width:50px;height:50px;display:flex;align-items:center;justify-content:center;margin-bottom:8px;">
          <svg width="30" height="30" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#25d366"/><path d="M22.5 18.5c-.4-.2-2.3-1.1-2.6-1.2-.3-.1-.5-.2-.7.2-.2.4-.8 1.2-1 1.4-.2.2-.4.3-.8.1-.4-.2-1.7-.6-3.2-2-1.2-1.1-2-2.4-2.2-2.8-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.2-.4.3-.6.1-.2 0-.5-.1-.7-.1-.2-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.3-.2.2-1.1 1.1-1.1 2.7 0 1.6 1.2 3.1 1.4 3.3.2.2 2.3 3.5 5.6 4.7.8.3 1.4.5 1.9.6.8.1 1.5.1 2.1.1.6 0 1.8-.7 2-1.4.2-.7.2-1.3.1-1.4-.1-.1-.4-.2-.8-.4z" fill="#fff"/></svg>
        </div>
        <div style="background:#fff;border-radius:10px;padding:10px 20px;box-shadow:0 2px 8px #eee;text-align:center;">
          <div style="font-size:0.9rem;font-weight:600;letter-spacing:2px;">WHATSAPP US</div>
          <div style="font-size:1rem;margin-top:2px;">123</div>
        </div>
      </div>
    </div>
  `;

  // Add event listener for Book Dates button to show booking form
  setTimeout(function() {
    const bookBtn = document.getElementById('bookDatesBtn');
    if (bookBtn) {
      bookBtn.onclick = function() {
        body.innerHTML = `
          <div style=\"display:flex;align-items:center;gap:15px;margin-bottom:15px;\">
            <img src=\"${trek.image}\" style=\"width:60px;height:60px;border-radius:10px;object-fit:cover;\">
            <div>
              <div style=\"font-size:1.1rem;font-weight:600;\">${trek.name} [Rs.${trek.price}]</div>
              <span style=\"background:#5fd34a;color:#fff;padding:2px 10px;border-radius:8px;font-size:0.9rem;\">Available</span>
            </div>
          </div>
          <form id=\"bookingForm\">
            <label style=\"font-weight:600;margin-bottom:5px;display:block;\">Select Dates</label>
            <select id=\"dateSelect\" style=\"width:100%;padding:10px;margin-bottom:15px;border-radius:7px;border:1px solid #ccc;\">
              <option value=\"\">-</option>
              <option value=\"Fri Sep 12 to Sun Sep 14\">Fri Sep 12 • to Sun Sep 14 •</option>
              <option value=\"2025-09-10\">10 Sep 2025</option>
              <option value=\"2025-09-17\">17 Sep 2025</option>
            </select>
            <label style=\"font-weight:600;margin-bottom:5px;display:block;\">Name</label>
            <input type=\"text\" style=\"width:100%;padding:10px;margin-bottom:15px;border-radius:7px;border:1px solid #ccc;\" placeholder=\"Full Name\" required>
            <div style=\"display:flex;gap:10px;\">
              <div style=\"flex:1;\">
                <label style=\"font-weight:600;margin-bottom:5px;display:block;\">ISD Code</label>
                <select style=\"width:100%;padding:10px;margin-bottom:15px;border-radius:7px;border:1px solid #ccc;\">
                  <option value=\"+91\">+91</option>
                  <option value=\"+1\">+1</option>
                  <option value=\"+44\">+44</option>
                </select>
              </div>
              <div style=\"flex:2;\">
                <label style=\"font-weight:600;margin-bottom:5px;display:block;\">Phone Number (WhatsApp)</label>
                <input type=\"tel\" style=\"width:100%;padding:10px;margin-bottom:15px;border-radius:7px;border:1px solid #ccc;\" placeholder=\"Phone Number\" required pattern=\"[0-9]{10}\">
              </div>
            </div>
            <label style=\"font-weight:600;margin-bottom:5px;display:block;\">Email Address</label>
            <input type=\"email\" style=\"width:100%;padding:10px;margin-bottom:15px;border-radius:7px;border:1px solid #ccc;\" placeholder=\"Email Address\" required>
            <label style=\"font-weight:600;margin-bottom:5px;display:block;\">State</label>
            <select style=\"width:100%;padding:10px;margin-bottom:15px;border-radius:7px;border:1px solid #ccc;\">
              <option value=\"\">Select...</option>
              <option value=\"Karnataka\">Karnataka</option>
              <option value=\"Kerala\">Kerala</option>
              <option value=\"Tamil Nadu\">Tamil Nadu</option>
            </select>
            <label style=\"font-weight:600;margin-bottom:5px;display:block;\">City</label>
            <select style=\"width:100%;padding:10px;margin-bottom:15px;border-radius:7px;border:1px solid #ccc;\">
              <option value=\"\">Select...</option>
              <option value=\"Bangalore\">Bangalore</option>
              <option value=\"Mysore\">Mysore</option>
              <option value=\"Mangalore\">Mangalore</option>
            </select>
            <label style=\"font-weight:600;margin-bottom:5px;display:block;\">Source</label>
            <select style=\"width:100%;padding:10px;margin-bottom:25px;border-radius:7px;border:1px solid #ccc;\">
              <option value=\"\">Select...</option>
              <option value=\"Google\">Google</option>
              <option value=\"Instagram\">Instagram</option>
              <option value=\"Friend\">Friend</option>
            </select>
            <button type=\"submit\" style=\"width:100%;background:#22a63a;color:#fff;font-weight:600;font-size:1.2rem;padding:12px 0;border:none;border-radius:7px;letter-spacing:2px;margin-bottom:10px;\">NEXT</button>
          </form>
          <div style=\"text-align:center;margin-top:10px;font-size:0.95rem;color:#22a63a;\">
            <span style=\"display:inline-flex;align-items:center;gap:5px;\"><svg width=\"18\" height=\"18\" fill=\"#22a63a\" viewBox=\"0 0 24 24\"><path d=\"M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1-6l-4-4 1.414-1.414L11 13.172l5.293-5.293 1.414 1.414-6.707 6.707z\"></path></svg>secured by : logout.studio</span>
          </div>
        `;
        setTimeout(() => {
          document.getElementById('bookingForm').onsubmit = function(e) {
            e.preventDefault();
            const date = document.getElementById('dateSelect').value;
            showTicketStep(date);
          };
        }, 100);
      };
    }
  }, 100);
  modal.classList.remove('hidden');
}

document.getElementById('closeModal').onclick = function() {
  document.getElementById('detailsModal').classList.add('hidden');
};

window.onclick = function(event) {
  const modal = document.getElementById('detailsModal');
  if (event.target === modal) {
    modal.classList.add('hidden');
  }
};

renderTreks();
