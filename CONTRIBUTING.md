# Contributing to Photon

Thank you for your interest in contributing to Photon! We welcome contributions from the community.

## Code of Conduct

This project maintains a welcoming and inclusive environment for all contributors. Please be respectful and constructive in all interactions.

## How to Contribute

### Reporting Issues

* Check existing [issues](https://github.com/mwhite454/photon/issues) to avoid duplicates
* Provide clear reproduction steps
* Include version information and environment details
* Add relevant code samples or screenshots

### Submitting Changes

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/photon.git
   cd photon
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
5. **Make your changes**:
   * Follow existing code style and conventions
   * Add tests for new functionality
   * Update documentation as needed
   * Ensure all tests pass: `npm test`
   * Verify the build succeeds: `npm run build`
6. **Commit your changes**:
   ```bash
   git commit -m "Description of your changes"
   ```
7. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
8. **Create a Pull Request** on GitHub

### Development Setup

See the [build documentation](https://github.com/mwhite454/photon/wiki/Contributors-Build) for detailed setup instructions.

### Contributing to Documentation

The Photon documentation is built with MkDocs and hosted on GitHub Pages.

1. **Install documentation dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Edit documentation files** in `docs/docs/`:
   * Documentation is written in Markdown
   * Code examples use ES6 imports from `@7syllable/photon-core`
   * Follow existing formatting and structure

3. **Preview your changes locally**:
   ```bash
   cd docs
   mkdocs serve
   ```
   Visit [http://localhost:8000](http://localhost:8000) - changes auto-reload.

4. **Build to verify** (optional):
   ```bash
   cd docs
   mkdocs build
   ```

5. **Submit your PR** with documentation changes

**Documentation Guidelines**:
* Use clear, concise language
* Include code examples for all features
* Use proper markdown formatting
* Add frontmatter (title, description, keywords) to new pages
* Test code examples to ensure they work

### Testing

We need more unit tests! Contributions that add test coverage are especially welcome.

* Run tests: `npm test`
* Run build: `npm run build`
* Start playground: `npm start`
* Serve docs: `cd docs && mkdocs serve`

### Pull Request Guidelines

* Keep changes focused and atomic
* Write clear commit messages
* Update documentation for API changes
* Add tests for bug fixes and new features
* Ensure CI checks pass

## License

By contributing to Photon, you agree that your contributions will be licensed under the Apache 2.0 License.

## Questions?

Feel free to open an issue for questions or discussion.
