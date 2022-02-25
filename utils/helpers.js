module.exports = {
    format_date: date => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
        date
      ).getFullYear()}`;
    },
    shorten_string: post_text => {
      const newString = post_text.substring(0, 199)
      return `${newString}...`;
    }
  }








