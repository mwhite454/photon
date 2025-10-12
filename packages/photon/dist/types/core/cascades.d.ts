declare namespace MakerJs {
    interface ICascade {
        $initial: any;
        $result: any;
        $reset: () => this;
    }
    interface ICascadeModel extends ICascade {
    }
    interface ICascadePath extends ICascade {
    }
    interface ICascadePoint extends ICascade {
    }
}
