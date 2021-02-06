const WindowWidth = {
  data: () => {
    return {
      WindowWidth: null,
    }
  },
  mounted: function () {
    this.WindowWidth = window.innerWidth;

    window.addEventListener('resize', () => {
      this.WindowWidth = window.innerWidth;
    });
  }
};

export  { WindowWidth };
