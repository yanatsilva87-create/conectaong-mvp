"use strict";

function showFeedback(element, message, type) {
  element.textContent = message;
  element.className = `form-feedback is-${type}`;
  element.hidden = false;
}

function clearFeedback(form, feedback) {
  form.querySelectorAll("[aria-invalid='true']").forEach((field) => {
    field.removeAttribute("aria-invalid");
  });
  feedback.hidden = true;
  feedback.textContent = "";
  feedback.className = "form-feedback";
}

function markInvalid(fields) {
  fields.forEach((field) => field.setAttribute("aria-invalid", "true"));
  if (fields.length > 0) {
    fields[0].focus();
  }
}

const donationForm = document.querySelector("#donation-form");
if (donationForm) {
  const donationFeedback = document.querySelector("[data-feedback='donation']");
  const itemField = donationForm.querySelector("#donation-item");
  const quantityField = donationForm.querySelector("#donation-quantity");
  const dateField = donationForm.querySelector("#donation-date");

  donationForm.addEventListener("input", () => clearFeedback(donationForm, donationFeedback));
  donationForm.addEventListener("change", () => clearFeedback(donationForm, donationFeedback));
  donationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearFeedback(donationForm, donationFeedback);

    const invalidFields = [];
    if (!itemField.value.trim()) invalidFields.push(itemField);
    if (!quantityField.value || Number(quantityField.value) < 1 || !Number.isFinite(Number(quantityField.value))) {
      invalidFields.push(quantityField);
    }
    if (!dateField.value) invalidFields.push(dateField);

    if (invalidFields.length > 0) {
      markInvalid(invalidFields);
      showFeedback(
        donationFeedback,
        "Confira os campos obrigatórios: informe o item, uma quantidade igual ou maior que 1 e a data da doação.",
        "error"
      );
      return;
    }

    showFeedback(donationFeedback, "Doação registrada com sucesso.", "success");
    donationForm.reset();
    donationFeedback.setAttribute("role", "status");
    itemField.focus();
  });
}

const volunteerForm = document.querySelector("#volunteer-form");
if (volunteerForm) {
  const volunteerFeedback = document.querySelector("[data-feedback='volunteer']");
  const nameField = volunteerForm.querySelector("#volunteer-name");
  const emailField = volunteerForm.querySelector("#volunteer-email");
  const availabilityField = volunteerForm.querySelector("#volunteer-availability");
  const volunteerList = document.querySelector("#volunteer-list");
  const volunteerCount = document.querySelector("[data-volunteer-count]");

  volunteerForm.addEventListener("input", () => clearFeedback(volunteerForm, volunteerFeedback));
  volunteerForm.addEventListener("change", () => clearFeedback(volunteerForm, volunteerFeedback));
  volunteerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearFeedback(volunteerForm, volunteerFeedback);

    const invalidFields = [];
    if (!nameField.value.trim()) invalidFields.push(nameField);
    if (!emailField.value.trim() || !emailField.validity.valid) invalidFields.push(emailField);
    if (!availabilityField.value) invalidFields.push(availabilityField);

    if (invalidFields.length > 0) {
      markInvalid(invalidFields);
      const emailInvalid = invalidFields.includes(emailField) && emailField.value.trim().length > 0;
      showFeedback(
        volunteerFeedback,
        emailInvalid
          ? "Informe um e-mail válido, seu nome e sua disponibilidade."
          : "Preencha seu nome, um e-mail válido e selecione sua disponibilidade.",
        "error"
      );
      return;
    }

    const listItem = document.createElement("li");
    listItem.className = "volunteer-person";

    const avatar = document.createElement("span");
    avatar.className = "avatar avatar-green";
    avatar.setAttribute("aria-hidden", "true");
    avatar.textContent = nameField.value.trim().slice(0, 2).toLocaleUpperCase("pt-BR");

    const personInfo = document.createElement("span");
    personInfo.className = "volunteer-person-info";
    const personName = document.createElement("strong");
    personName.textContent = nameField.value.trim();
    const personAvailability = document.createElement("span");
    personAvailability.textContent = availabilityField.value;
    personInfo.append(personName, personAvailability);

    const check = document.createElement("span");
    check.className = "person-check";
    check.setAttribute("aria-label", "Cadastrada");
    check.textContent = "✓";

    listItem.append(avatar, personInfo, check);
    volunteerList.prepend(listItem);
    const total = volunteerList.children.length;
    volunteerCount.textContent = `${total} ${total === 1 ? "pessoa" : "pessoas"}`;

    showFeedback(volunteerFeedback, "Voluntário cadastrado com sucesso.", "success");
    volunteerFeedback.setAttribute("role", "status");
    volunteerForm.reset();
  });
}

const detailsButton = document.querySelector("[data-action='campaign-details']");
if (detailsButton) {
  const details = document.querySelector("#campaign-details");
  detailsButton.addEventListener("click", () => {
    const isExpanded = detailsButton.getAttribute("aria-expanded") === "true";
    detailsButton.setAttribute("aria-expanded", String(!isExpanded));
    details.hidden = isExpanded;
  });
}

const newCampaignButton = document.querySelector("[data-action='new-campaign']");
if (newCampaignButton) {
  const campaignFeedback = document.querySelector("[data-feedback='campaign']");
  newCampaignButton.addEventListener("click", () => {
    campaignFeedback.textContent = "O cadastro de novas campanhas não está disponível nesta versão do protótipo.";
    campaignFeedback.hidden = false;
    campaignFeedback.setAttribute("role", "status");
    campaignFeedback.focus();
  });
  campaignFeedback?.setAttribute("tabindex", "-1");
}
