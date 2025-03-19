import './comment.scss';

export default function () {
  document.addEventListener('DOMContentLoaded', function () {
    processTypeValue();
    initReplyLinks();
  });
}

function initReplyLinks() {
  const replyLinks = document.querySelectorAll('[data-comment-reply]');

  if (replyLinks) {
    replyLinks.forEach((link) => {
      link.addEventListener('click', function (event) {
        event.preventDefault();

        const value = this.getAttribute('data-comment-reply');
        const input = document.getElementById('reply_to_comment_replyToId');

        if (input) {
          input.value = value;

          const typeBlock = document.getElementById('comment_type_block');
          const markBlock = document.getElementById('comment_mark_block');

          if (typeBlock) {
            typeBlock.classList.add('hidden');
            markBlock.classList.add('hidden');
            markField.checked = false;
          }
        }
      });
    });
  }
}

function processTypeValue() {
  const typeRadioButtons = document.querySelectorAll("#comment_type_block input[type='radio']");
  const markField = document.querySelector('#comment_mark_block');

  if (typeRadioButtons && markField) {
    typeRadioButtons.forEach(function (button) {
      button.addEventListener('change', function () {
        const value = button.getAttribute('data-comment-type');
        if (value == 'question') {
          markField.classList.add('hidden');
          markField.checked = false;
        } else {
          markField.classList.remove('hidden');
        }
      });
    });
  }

  // trigger to process default value on page load (not works now)
  //const event = new Event('change');
  //typeRadioButtons[0].dispatchEvent(event);
}
